
var Telenode = require('../lib/telenode');
var client = new Telenode(new Telenode.providers.Twilio);

//
// Signup at twilio.com to get a `sid` and `token`.
//
client.credentials('../credentials');

//
// send an sms message
//
client.SMS.send({
  from: '+1-111-111-1111',
  to: '+1-111-111-1111',
  body: 'Hello'
});
