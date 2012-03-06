# NOT READY YET! WORK IN PROGRESS!

# Synopsis
Multi-vendor cellular network services for node.js

# Motivation
Everything else sucks

# Features
- Send SMS
- Make and Recieve Phone calls
- Simple API

# Providers
- Twillio (SMS, Call)

# Usage

## Example

```js
var Telenode = require('telenode');
var client = new Telenode(new Telenode.providers.twilio);

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
// This will output some text to the console.
//
client.Container.getTheSameInfo();
client.Container.getSomeInfo();
```


# Installation

# Build Status

# API

# License
