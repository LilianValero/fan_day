
Parse.Cloud.define("tapatalk", function(request, response) {
  getForumConfig('https://support.tapatalk.com/mobiquo/mobiquo.php', response);
});

Parse.Cloud.define("tottenham", function(request, response) {
  getForumConfig('http://www.tottenhamhotspurs.tv/forum/mobiquo/mobiquo.php', response);
});

function getForumConfig(url, response) {
  Parse.Cloud.httpRequest({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'text/xml'
    },
    body: '<?xml version="1.0"?><methodCall><methodName>get_config</methodName><params></params></methodCall>',
    success: function(httpResponse) {
      response.success(httpResponse.text);
    },
    error: function(httpResponse) {
      response.error('Request failed with response ' + httpResponse.status + ' ' + httpResponse.text);
    }
  });
}
