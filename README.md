# NOT READY YET! A WORK IN PROGRESS!

# Synopsis
A simple milti-vendor telephony library.

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
var client = new Telenode(Telenode.providers.twilio());

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
