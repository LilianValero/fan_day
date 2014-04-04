var xmlrpc = require('xmlrpc');

var client = xmlrpc.createClient('http://www.tottenhamhotspurs.tv/forum/mobiquo/mobiquo.php');
client.methodCall('get_config', [], function(err, config) {
  if (err) console.log('Error in get_config', err);
  else {
    if (!config.get_forum) console.log('No forum available');
    else {
      client.methodCall('get_forum', [true], function(err, forum) {
        if (err) console.log('Error in get_forum', err);
        else console.log('Forum', forum);
      });
    }
  }
});
