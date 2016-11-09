var request = require('request'),
  open = require("open"),
  jsdom = require("jsdom");

require('dotenv').config();

var SAAS_URL = process.env.SAAS_URL,
  CONNECTION = process.env.CONNECTION,
  USERNAME = process.env.USERNAME,
  PASSWORD = process.env.PASSWORD,
  CLIENT_ID = process.env.CLIENT_ID,
  REDIRECT_URI = process.env.REDIRECT_URI,
  TENANT = process.env.TENANT;

var options = {
  method: 'POST',
  url: SAAS_URL + '/usernamepassword/login',
  headers: {
    'cache-control': 'no-cache',
    'content-type': 'application/json'
  },
  body: {
    scope: 'openid',
    response_type: 'code',
    sso: true,
    connection: CONNECTION,
    username: USERNAME,
    password: PASSWORD,
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    tenant: TENANT
  },
  json: true
};

console.log('Options: ' + JSON.stringify(options));

request(options, function (error, response, html) {
  if (error) {
    throw new Error(error);
  }
  jsdom.env("", function (error, window) {
    if (error) {
      throw new Error(error);
    }
    var $ = require("jquery")(window);
    var w = {};
    w.wa = $(html).find('input[name="wa"]').val();
    w.wresult = $(html).find('input[name="wresult"]').val();
    w.wctx = $(html).find('input[name="wctx"]').val();

    console.log('Login response: ' + JSON.stringify(w));

    request.post({
      url: SAAS_URL + '/login/callback',
      form: w
    }, function (error, response, body) {
      if (error) {
        throw new Error(error);
      }
      console.log('Body: ' + body);
      var url = body.split(" ")[3];
      console.log('URL is: ' + url);
      console.log('Opening URL in browser...');
      open(url);
      // open(url, 'google chrome');
    });
  });

});