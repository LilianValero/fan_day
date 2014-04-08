'use strict';

var xmlrpc = require('xmlrpc');
var _ = require('underscore');
var fs = require('fs');

var forumContexts = [{ team: 'tottenham', url: 'http://www.tottenhamhotspurs.tv/forum', topForumId: '6', subForumId: '81', topicId: '35872' }];
var teams = _.map(forumContexts, function(context) { return context.team; });

var args = process.argv.slice(2);
if (args.length === 0 || !_.contains(teams, args[0])) {
  console.log('Usage: node main ' + teams.join('|'));
  process.exit(1);
}

var forumContext = _.find(forumContexts, function(context) { return context.team === args[0]; });
var postInfoFile = fs.createWriteStream(forumContext.team + 'Posts.json', { flags: 'w', encoding: 'utf-8' });
var client = xmlrpc.createClient(forumContext.url + '/mobiquo/mobiquo.php');
getConfig(forumContext);

function getConfig(context) {
  callMethod('get_config', [], getForum, context);
}

function getForum(config, context) {
  if (config.get_forum) callMethod('get_forum', [], getSubForum, context);
  else console.log('No get_forum available');
}

function getSubForum(forum, context) {
  var topForum = _.find(forum, function(subForum) { return subForum.forum_id === context.topForumId });
  if (!topForum) console.log('Could not find forum with ID ' + context.topForumId);
  else {
    console.log('topForum', topForum);
    var subForum = _.find(topForum.child, function(subForum) { return subForum.forum_id === context.subForumId });
    if (!subForum) console.log('Could not find sub-forum with ID ' + context.subForumId);
    else getTopics(subForum.forum_id, context);
  }
}

function getTopics(forumId, context) {
  callMethod('get_topic', [forumId], getThread, context);
}

function getThread(topics, context) {
  // Here we could use e.g. the most recent topic
  getPosts(context.topicId, 0, context);
}

function getPosts(topicId, postStartNumber, context) {
  var maxPostCountPerRequest = 50
  callMethod('get_thread', [topicId, postStartNumber, postStartNumber + maxPostCountPerRequest - 1, true], parsePosts, context);
}

function parsePosts(thread) {
  var postInfos = _.map(thread.posts, function(post) { return postInfo(post); });
  console.log('postInfos', postInfos);
  postInfoFile.write(JSON.stringify(postInfos, null, 4));

  if (thread.posts.length > 0) {
    // Get next posts
    var totalPostCount = thread.total_post_num;
    var lastPostCounter = _.last(thread.posts).post_count;
    if (lastPostCounter < totalPostCount) getPosts(thread.topic_id, lastPostCounter);
  }
  else postInfoFile.end();
}

function postInfo(post) {
  // Normally should take this from config.charset but 'ISO-8859-1' is not supported (!)
  var charset = 'utf-8';
  return {
    timestamp: post.timestamp,
    author: post.post_author_name.toString(charset),
    content: post.post_content.toString(charset)
  };
}

function callMethod(method, params, callback, context) {
  client.methodCall(method, params, function(err, response) {
    if (err) console.log('Error in ' + method, err);
    else {
      console.log('Response to ' + method, response);
      callback(response, context);
    }
  });
}
