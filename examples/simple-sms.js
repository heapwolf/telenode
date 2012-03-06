
var Telenode = require('../lib/telenode');
var client = new Telenode(Telenode.providers.twilio);

client.credentials({

  //
  // add these two things however you want, if you
  // do not have them, just signup at `twilio.com`.
  //
  sid: '',
  token: ''
});

//
// send an sms message
//
client.SMS.send({

  //
  // put your twillio phone number here.
  //
  from: '+1-111-111-1111',

  //
  // put your cell phone number here.
  //
  to: '+1-111-111-1111',

  //
  // some message goes here.
  //
  body: 'Hello'

});
