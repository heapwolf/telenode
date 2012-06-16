var Telenode = require('telenode');
var client = new Telenode(Telenode.providers.twilio);

client.credentials({

  //
  // add these two things however you want, if you
  // do not have them, just signup at `twilio.com`.
  //
  sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authToken: 'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY'
});

//
// send an sms message
//
client.SMS.send({

  //
  // put your twillio phone number here.
  //
  from: '+19171239876',

  //
  // put your cell phone number here.
  //
  to: '+19171239876',

  //
  // some message goes here.
  //
  body: 'Hello World'

}, function(err, body) {
  if (err) throw err;
  console.log('Body: ' + body);
});
