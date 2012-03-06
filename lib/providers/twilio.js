
/*
 * twilio.js: An intermediate provider.
 *
 * MIT License 2012. Nodejitsu, Inc.
 *
 */

var request = require('request'),
    querystring = require('querystring'),
    Buffer = require('buffer').Buffer;

var API_SERVER = 'https://api.twilio.com';
var API_VERSION = '2010-04-01';

//
// ### fuction credentials(params)
// #### @params {Obejct} An object literal for configuration settings.
//
// Set the credentials for the provider.
//
exports.credentials = function(params) {

  //
  // check specific requirements for establishing credentials.
  //
  if(!params.sid) {
    throw new Error('Required: SID');
  }

  if(!params.authToken) {
    throw new Error('Required: authToken');
  }

  this.sid = params.sid;
  this.authToken = params.authToken;

  this.basicAuth = (new Buffer(params.sid + ':' + params.authToken)).toString('base64');

  return this;
};

//
// ### function configure(params)
// #### @params {Object} An object literal for configuration settings.
//
// Configure the instance.
//
exports.configure = function(params) {

  this.configured = true;

  //
  // establish the base url for requests.
  //
  this.base = (params && params.base) || API_SERVER + '/' + API_VERSION + '/Accounts/' + this.sid;

};

//
// SMS API.
// 
exports.SMS = {

  //
  // TODO: Implement
  //
  recieve: function() {

    if (!this.configured) {
      this.configure();
    }

    return this;
  },

  // 
  // ### function sendSms(from, to, body, uri, success, error)
  // 
  // @from {String} The outgoing callerId. Must be a valid twilio/outgoing
  // caller id number, in E.164 format (i.e., +18674451795)
  // @to {String} The number of the message target. Same format as from.
  // @body {String} The body of the SMS. Must be < 160 chars.
  // @uri {String} The optional status callback URI.
  //
  // send an SMS
  //
  send: function(params, callback) {

    var that = this;

    if (!this.configured) {
      this.configure();
    }

    if (!params.from || !params.to || !params.body) {
      throw new Error('Required: From, To, and Body argument');
    }

    function sendSMS(to) {

      var payload = {
        From: params.from.replace(/-/g, ''),
        To: to || params.to.replace(/-/g, ''),
        Body: params.body
      };

      if (payload.uri) {
        payload.StatusCallback = params.uri;
      }

      var body = querystring.stringify(payload);
      var headers = {};

      headers['Content-Length'] = body.length;
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      headers['Authorization'] = 'Basic ' + this.basicAuth;

      request(
        {
          method: 'POST',
          uri: that.base + '/SMS/Messages.json',
          headers: headers,
          body: body
        },
        function (err, response, body) {

          if (callback) {
            return err ? callback(err) : callback(null, body);
          }
        }
      );
    }

    if (Array.isArray(params.to)) {

      params.to.forEach(function(recip) {

        sendSMS(recip);
      });
    }
    else {

      sendSMS();
    }

    return this;
  }
};

// 
// ### function getAccountInfo()
// #### @callback {function} A callback.
//
// Request your account information
// 
exports.getAccountInfo = function(callback) {

  request.get(this.base, null, callback);
  return this;
};

// 
// ### function updateAccountInfo()
// #### @params {Object} Object literal of settings to update.
//
// Update your account information
// 
exports.updateAccountInfo = function(params, callback) {
  request.post(this.base, { params: params }, callback);
  return this;
};
