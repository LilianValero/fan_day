
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("tapatalk", function(request, response) {
  testTapatalk(response);
});

function testTapatalk(response) {
  Parse.Cloud.httpRequest({
    method: 'POST',
    url: 'https://support.tapatalk.com/mobiquo/mobiquo.php',
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
