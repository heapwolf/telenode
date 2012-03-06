
/*
 * telenode.js: main program
 *
 * MIT License 2012. Nodejitsu, Inc.
 *
 */

var http = require('http'),
    fs = require('fs');

var providers = {};

fs.readdirSync(__dirname + '/providers').forEach(function (name) {

  if (~name.indexOf('.js')) {

    name = name.replace('.js', '');
    providers[name] = require(__dirname + '/providers/' + name);
  }
});

var Telenode = module.exports = function Telenode(provider) {

  if(!(this instanceof Telenode)) {
    return new Telenode(provider);
  }

  var that = this;

  this.HTTP = {};

  for (var f in HTTP) {
    typeof HTTP[f] === 'function' && (this.HTTP[f] = HTTP[f].bind(this));
  }

  for (var member in provider) {
    if (typeof provider[member] === 'function') {

      if (member === 'HTTP' || member === 'provider') {
        throw new Error('API object or function name `' + member + '` is reserved');
      }
      this[member] = provider[member].bind(this);
    }
    else {
      this[member] = {};
      for (var f in provider[member]) {
        if (typeof provider[member][f] === 'function') {
          this[member][f] = provider[member][f].bind(this);
        }
      }
    }
  }

};

Telenode.providers = providers;

Telenode.prototype.provider = function(provider) {

  Telenode.prototype.__proto__ = provider.prototype;
  return this;
};

//
// HTTP convenience
//
var HTTP = {

  //
  // Simple routes
  //
  routes: {},

  serve: function(routes) {

    var that = this;

    //
    // accept new routes from the serve call.
    //
    this.routes = this.routes || routes;

    this.server = http.createServer(function (req, resp) {

      //
      // if there are routes defined, and the route is a match to the request url,
      // then check to see if a method is specified on the route, if there is it
      // must match, otherwise, we dont care just fire the callback for the route.
      //
      that.routes && routes.forEach(function(route) {
        
        if (route.indexOf(req.url)) {
          if (typeof route.method === 'undefined' || route.method === req.method) {
            route.callback(req, resp);
          }
        }
      });
    });    
  }

};
