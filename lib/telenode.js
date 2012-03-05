
var providers = require('./providers');
var http = require('http');

var Telenode = module.exports = function Telenode(provider) {

  if(!(this instanceof Telenode)) {
    return new Telenode(provider);
  }

  var that = this;

  Telenode.prototype.__proto__ = provider.prototype;

  //
  // routes for inbound requests.
  //
  this.routes = conf.routes || [];

  //
  // a simple request inboud server.
  //
  if (typeof this.server === 'undefined' || this.server !== false) {
    
    this.server = http.createServer(function (req, resp) {

      //
      // if there are routes defined, and the route is a match to the request url,
      // then check to see if a method is specified on the route, if there is it
      // must match, otherwise, we dont care just fire the callback for the route.
      //
      that.routes && routes.forEach(function(route) {
        if (route.url.indexOf(req.url)) {
          if (typeof route.method === 'undefined' || route.method === req.method) {
            route.callback(resp);
          }
        }
      });
    });
  }
  else {

    this.server = conf.server;
  }

};

Telenode.providers = providers;

Telenode.prototype.provider = function(provider) {

  Telenode.prototype.__proto__ = provider.prototype;
  return this;
};
