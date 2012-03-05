
/*
 * twilio.js: An intermediate provider.
 *
 * MIT License 2012. Nodejitsu, Inc.
 *
 */

var request = require('request');

var Twilio = exports.Twilio = function Twilio() {

  if(!(this instanceof Twilio)) {
    return new Twilio();
  }

  this.configured = false;

  //
  // A simple way to group the functions 
  // but maintain execution context.
  //
  this.SMS = {};

  for (var f in SMS) {
    this.SMS[f] = SMS[f].bind(this);
  }
};

//
// ### fuction credentials(conf)
// #### @conf {Obejct} An object literal for configuration settings.
//
// Set the credentials for the provider.
//
Twilio.prototype.credentials = function(conf) {
  
  conf = conf || require('../../credentials')['twilio'];

  //
  // check specific requirements for establishing credentials.
  //
  if(!conf.sid) {
    throw new Error('Required: SID');
  }

  if(!conf.authToken) {
    throw new Error('Required: authToken');
  }

  this.sid = conf.sid;
  this.authToken = conf.authToken || conf.token;

  this.basicAuth = (new Buffer(conf.sid + ':' + conf.authToken)).toString('base64');

  return this;
};

//
// ### function configure(conf)
// #### @conf {Object} An object literal for configuration settings.
//
// Configure the instance.
//
Twilio.prototype.configure = function(conf) {

  this.configured = true;

  //
  // establish the base url for requests.
  //
  this.base = conf.base || '/' + API_VERSION + '/Accounts/' + self.sid;

};

//
// SMS API.
// 
var SMS = {

  //
  // TODO: Implement
  //
  recieve: function() {
  },

  // 
  // ### function sendSms(from, to, body, uri, success, error)
  // 
  // @from {String} The outgoing callerId. Must be a valid twilio/outgoing
  // caller id number, in E.164 format (i.e., +18674451795)
  // @to {String} The number of the message target. Same format as from.
  // @body {String} The body of the SMS. Must be < 160 chars.
  // @uri {String} The optional status callback URI.
  send: function(from, to, body, uri, callback) {

    if (!this.configured) {
      this.configure();
    }

    if (!from || !to || !body) {
      throw new Error('Required: From, To, and Body argument');
    }
    var params = {
      From: from.replace('-', ''),
      To: to.replace('-', ''),
      Body: body
    };
    
    if (uri) {
      params.StatusCallback = uri;
    }

    request.post(this.base + '/SMS/Messages', { params: params }, function(err, request, body) {

      callback(err, body);
    });
  }
};

// 
// ### function getAccountInfo()
// #### @callback {function} A callback.
//
// Request your account information
// 
ProviderName.prototype.getAccountInfo = function(callback) {
  request.get(this.base, null, callback);
  return this;
};

// 
// ### function updateAccountInfo()
// #### @params {Object} Object literal of settings to update.
//
// Update your account information
// 
ProviderName.prototype.updateAccountInfo = function(params, callback) {
  request.post(this.base, { params: params }, callback);
  return this;
};
