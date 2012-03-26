# Synopsis
Multi-vendor cellular network services for node.js

# Motivation
Everything else sucks

# Features
- Send SMS
- Make and Recieve Phone calls

# Providers
- Twillio (SMS, Call)

# Usage

## Example

```js
var Telenode = require('telenode');
var client = new Telenode(Telenode.providers.twilio);

client.SMS.send({
  from: '+1-917-123-9876', 
  to: '+1-917-123-9876', 
  body: 'Hello'
});

```

# Vendors and Authors
Create a file that has the name of the service, place it in the providers directory. Everything that is exported is attached to the new `Telenode` instance. Let's say we create a file called `foobar.js`.

```js
//
// this will become available on the new instance.
//
exports.getSomeInfo = function() { 
  console.log('here it is'); 
};

//
// create containers one level deep. they get bound to the correct context for you.
//
exports.Container = {
  getTheSameInfo: function() { this.getInfo(); },
  getSomeNewInfo: function() { console.log('something new'); }
};

```

```js
var client = new Telenode(new Telenode.providers.foobar);

//
// This is a contrived example that will simply output text to the console,
// but it demonstrates how the module will be attached to the instance.
//
client.Container.getTheSameInfo();
client.Container.getSomeInfo();
```

Often your API service will want to let you know after some operation has finished. The plugin structure provides a web server to listen for API services that want to call back. In your provider module, you can add routes for this.

```js
exports.getSomeInfo = function() { 
  
  this.HTTP.route({

    '/inbound/url/sample/',
    'POST',
    function(data) {

      //
      // handle the inbound request from the API service.
      //
    }
  });
};
```


# Installation

# Build Status

# API

# License
(The MIT License)

Copyright (c) 2010 hij1nx <http://www.twitter.com/hij1nx>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
