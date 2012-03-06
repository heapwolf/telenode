
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
    from: '+1-4150-799-3546',
    to: '+1-917-224-8228',
    body: 'Hello'
  },
  function(err, data) {
    console.log(err || data);
  }
);
