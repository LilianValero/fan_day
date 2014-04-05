'use strict';

var xmlrpc = require('xmlrpc');
var _ = require('underscore');

var client = xmlrpc.createClient('http://www.tottenhamhotspurs.tv/forum/mobiquo/mobiquo.php');
getConfig();

function getConfig() {
  callMethod('get_config', [], getForum);
}

function getForum(config) {
  if (config.get_forum) callMethod('get_forum', [], getSubForum);
  else console.log('No forum available');
}

function getSubForum(forum) {
  var toDareIsToDoSubForum = _.find(forum, function(subForum) { return subForum.forum_id === '6' });
  if (!toDareIsToDoSubForum) console.log('Could not find To Dare Is To Do ! sub-forum');
  else {
    console.log('getSubForum', toDareIsToDoSubForum);
    var matchDayChatSubForum = _.find(toDareIsToDoSubForum.child, function(subForum) { return subForum.forum_id === '81' });
    if (!matchDayChatSubForum) console.log('Could not find Match Day Chat sub-forum');
    else getTopics(matchDayChatSubForum.forum_id);
  }
}

function getTopics(forumId) {
  callMethod('get_topic', [forumId], getThread);
}

function getThread(topics) {
  // Here we could use e.g. the most recent topic; let's use the TOT vs. ARS match topic with ID 35872
  callMethod('get_thread', ['35872', 0, 49, true], getPosts);
}

function getPosts(thread) {
  var totalPostCount = thread.total_post_num;
  var retrievedPostCount = thread.posts.length;
  var postInfos = _.map(thread.posts, function(post) { return postInfo(post); });
  console.log('postInfos', postInfos);
  console.log('TODO: Get remaining ' + (totalPostCount - retrievedPostCount) + ' posts')
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

function callMethod(method, params, callback) {
  client.methodCall(method, params, function(err, response) {
    if (err) console.log('Error in ' + method, err);
    else {
      console.log('Response to ' + method, response);
      callback(response);
    }
  });
}
