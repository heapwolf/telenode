
var Telenode = require('../lib/telenode');
var client = new Telenode(Telenode.providers.twilio);

//
// get the appropriate credentials
//
var creds = require('../credentials/credentials')['twilio'];

//
// Signup at twilio.com to get a `sid` and `token`.
//
client.credentials(creds);

//
// send an sms message
//
client.SMS.send(
  {
    from: '+1-111-111-1111',
    to: '+1-111-111-1111',
    body: 'Hello'
  },
  function(err, data) {
    console.log(err || data);
  }
);