# NOT READY YET! WORK IN PROGRESS! I JUST NEEDED TO SEND A TEXT MESSAGE =)

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

## Simple example

```js
var Telenode = require('telenode');
var client = new Telenode(new Telenode.providers.twilio);

client.SMS.send({
  from: '+1-917-123-9876', 
  to: '+1-917-123-9876', 
  body: 'Hello'
});

```

# Installation

# Build Status

# API

# Vendors and Authors

# License
