var xmlrpc = require('xmlrpc');

var client = xmlrpc.createClient('http://www.tottenhamhotspurs.tv/forum/mobiquo/mobiquo.php');
client.methodCall('get_config', [], function(err, res) {
  if (err) console.log('Error', err)
  else console.log('Success', res);
});
