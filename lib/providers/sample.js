
var ProviderName = exports.ProviderName = function ProviderName() {
  if(!(this instanceof ProviderName)) {
    return new ProviderName();
  }

};

ProviderName.prototype.credentials = function(conf) {
  
  //
  // A setter for credentials.
  //
  return this;
};

ProviderName.prototype.configure = function(conf) {
  
  var that = this;

  this.configured = true;

  //
  // establish the base url for requests.
  //
  this.base = conf.base || '/';

  //
  // listeners for inbound requests.
  //
  this.listeners = [];

  //
  // a simple inboud server.
  //
  if (typeof this.server === 'undefined' || this.server === false) {
    
    this.server = http.createServer(function (req, resp) {
      that.listeners && listeners.forEach(function(listener) {
        if (listener.url.indexOf(req.url) && listener.method === req.method) {
          listener.callback(resp);
        }
      });
    });
  }
  else {

    this.server = conf.server;
  }

  return this;
};

ProviderName.prototype.send = function(from, to, body, uri, callback) {

  if (!this.configured) {
    this.configure(); // configure with defaults.
  }

  //
  // A method for sending an SMS.
  //
  return callback(err, data);
};

