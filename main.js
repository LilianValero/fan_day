'use strict';

var xmlrpc = require('xmlrpc');
var _ = require('underscore');

var client = xmlrpc.createClient('http://www.tottenhamhotspurs.tv/forum/mobiquo/mobiquo.php');
getConfig();

function getConfig() {
  callMethod('get_config', getForum);
}

function getForum(config) {
  if (config.get_forum) callMethod('get_forum', getSubForum);
  else console.log('No forum available');
}

function getSubForum(forum) {
  var toDareIsToDoSubForum = _.find(forum, function(subForum) { return subForum.forum_id === '6' });
  if (!toDareIsToDoSubForum) console.log('Could not find To Dare Is To Do ! sub-forum');
  else {
    console.log('getSubForum', toDareIsToDoSubForum);
    var matchDayChatSubForum = _.find(toDareIsToDoSubForum.child, function(subForum) { return subForum.forum_id === '81' });
    if (!matchDayChatSubForum) console.log('Could not find Match Day Chat sub-forum');
    else {
      console.log('TODO: Get topics with get_topic using forum ID ' + matchDayChatSubForum.forum_id);
    }
  }
}

function callMethod(method, callback) {
  client.methodCall(method, [], function(err, response) {
    if (err) console.log('Error in ' + method, err);
    else {
      console.log('Response to ' + method, response);
      callback(response);
    }
  });
}
