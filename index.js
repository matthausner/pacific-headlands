var cool = require('cool-ascii-faces');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require('express');
var app = express();


var passport = require('passport');
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');


/*var secret = speakeasy.generateSecret({length: 20});
console.log(secret.base32); // secret of length 20

QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
  console.log(data_url); // get QR code data URL
});*/

/*var secret = speakeasy.generateSecret({length: 20});
console.log(secret.base32); // secret of length 20

QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
  console.log(data_url); // get QR code data URL
});*/

/*var pg = require('pg');


app.get('/db/', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})*/


/*passport.use(new TotpStrategy(
    function(user, done) {
        // The user object carries all user related information, including
        // the shared-secret (key) and password.
        var key = user.key;
        if(!key) {
            return done(new Error('No key'));
        } else {
            return done(null, base32.decode(key), 30); //30 = valid key period
        }
    })
);*/

app.post('/passport/',
   passport.authenticate('local', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });








app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.post('/watchauth/', function(request, response) {


var secret = speakeasy.generateSecret({length: 20});
console.log(secret.base32); // secret of length 20

QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
  console.log(data_url); // get QR code data URL
});





var xhr = new XMLHttpRequest();
xhr.open("POST", "https://api.parse.com/1/push", true);
xhr.setRequestHeader("X-Parse-Application-Id", "M6ATSuRwG0zUOSj0IXx5tDAYo52RXUNzPyhrWGor");
xhr.setRequestHeader("X-Parse-REST-API-Key", "hdZEJnIG4cD6rAbzucTHbPpJses8m9t6jrBhE7Qg");
xhr.setRequestHeader("Content-Type", "application/json");

/*xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    var result = JSON.parse(xhr.responseText);
    if (result.objectId) {
      alert("saved an object with id: " + result.objectId);
    }
  }
}*/
  
var data = JSON.stringify({ 
        "where": {},
         "data": {
           "alert": "Proceed with Login?",
           "badge": "Increment",
           "sound": "cheering.caf",
           "title": "Login Request!",
           "category": "invitation" }});
xhr.send(data);

});


app.get('/cool/', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/confaces/', function(request, response) {
	var result =''
	var times  = process.env.times || 5
	for (i=0; i<times; i++)
		result+=cool();
		response.send(result);

});


process.stdout.on('error', function( err ) {
    if (err.code == "EPIPE") {
        process.exit(0);
    }
});

