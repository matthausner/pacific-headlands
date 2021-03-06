var cool = require('cool-ascii-faces');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
//var cheerio = require('cheerio');
//var $ = require('jquery')(window);
//console.log(cheerio('#totpinput')[0].name);




/*
var fs = require('fs');
var Canvas = require('canvas');
var passport = require('passport');*/

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

/*app.post('/passport/',
   passport.authenticate('local', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });*/








app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var secret = speakeasy.generateSecret({length: 20});
//console.log(secret.base32); // secret of length 20
QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
 //console.log(data_url); // get QR code data URL






app.get('/', function(request, response) {



  response.render('pages/login');


});






app.get('/authenticate/', function(request, response) {



var token = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32'
});

console.log("current token");
console.log(token);

var totpInput = request.query.totpinput; 
if (totpInput == token) {


    //response.render('Your Token Correct!!!:' +totpInput); 
    //response.render('pages/login');
    //response.redirect('/watchauth/');
    //response.flashMessage.push('TOTP Correct!');
     console.log('Token Correct!!!'); 
        response.send(

   '<h1> Your amazon.de coupon code is: <h1>'+
   '<h2> 1234567890 <h2>');





    }

     else {
        response.render('pages/totp');
      }



  

    //mytext is the name of your input box
    //res.send('Your TOTP:' +totpInput); 
   
   
});


app.post('/entertotp/', function(request, response, next) {

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
           "alert": "Enter TOTP",
           "badge": "Increment",
           "sound": "cheering.caf",
           "title": "Enter TOTP",
           "category": "invitation" }});
xhr.send(data);


response.render('pages/totp');


});



app.post('/setup2fa/', function(request, response, next) {

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
           "alert": "Scan or enter secret code",
           "badge": "Increment",
           "sound": "cheering.caf",
           "title": "Scan or enter secret code",
           "category": "invitation" }});
xhr.send(data);


response.send(

'<!DOCTYPE html>'+
'<html>'+
'<head>'+
 
'<title>Getting Started</title>'+
'<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />'+
'<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>'+
'<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>'+
'<link rel="stylesheet" type="text/css" href="/stylesheets/main.css" />'+

'</head>'+

'<body>'+


   '<div class="jumbotron text-center">'+
  '<div class="container">'+
    '<a href="/" class="lang-logo">'+
      '<img src="/LogoiCC.png">'+ 
    '</a>'+
    '<h1>Log in with WatchAuthentiCator</h1>'+
    '<p>Scan or enter the code displayed below with your WatchAuthentiCator app.</p>'+
    '</div>'+


'<div id="qrcode" title="qrcode">'+
'<canvas width="100" height="100"  style="display: none;"></canvas>'+
'<center><img style="display: block;" src="'+ data_url +'"></div></center><br>'+
'<div id="secret" title="secret">'+secret.base32+'</div><br>'+



'<form action="/entertotp/" method="POST">'+
   
   
    '<button type="submit" class="btn btn-lg btn-primary"><span class="glyphicon glyphicon-log-in"></span> I have scanned the code in my app</button>'+
'</form>'+

'</div>'

);



});


app.get('/watchauth/', function(request, response) {
     


var emailInput = request.query.emailinput; 
var email="mh232@hdm-stuttgart.de";


if (emailInput==email) {

console.log(email);
console.log(emailInput);
console.log('eMail Correct!!!'); 



response.render('pages/setup');



}

else {
console.log(emailInput);
console.log("Wrong email!!!");
  response.render('pages/login');
}

});


    //var myText = request.query.pipapo.value; //mytext is the name of your input box
    
    //console.log(myText);








app.get('/seqret/', function(request, response){



  //response.writeHead(200, {'content-type': 'text/html'});
    response.send(

'<!DOCTYPE html>'+
'<html>'+
'<head>'+
 
'<title>Getting Started</title>'+
'<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />'+
'<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>'+
'<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>'+
'<link rel="stylesheet" type="text/css" href="/stylesheets/main.css" />'+

'</head>'+

'<body>'+


   '<div class="jumbotron text-center">'+
  '<div class="container">'+
    '<a href="/" class="lang-logo">'+
      '<img src="/LogoiCC.png">'+ 
    '</a>'+
    '<h1>Log in with WatchAuthentiCator</h1>'+
    '<p>Scan or enter the code displayed below with your WatchAuthentiCator app.</p>'+
    '</div>'+


'<div id="qrcode" title="qrcode">'+
'<canvas width="100" height="100"  style="display: none;"></canvas>'+
'<center><img style="display: block;" src="'+ data_url +'"></div></center><br>'+
'<div id="secret" title="secret">'+secret.base32+'</div><br>'+



'<form action="/watchauth/" method="POST">'+
   
   '<!-- <input type="text" name="emailinput" class="textemail" required /></p>-->'+
    '<button type="submit" class="btn btn-lg btn-primary"><span class="glyphicon glyphicon-log-in"></span> I have scanned the code in my app</button>'+
'</form>'+

'</div>'

);





});

});






app.get('/cool/', function(request, response) {
response.send(cool());



/*canvas = new Canvas(150, 150);
ctx = canvas.getContext('2d');


ctx.fillRect(0,0,150,150);   // Draw a rectangle with default settings
ctx.save();                  // Save the default state

ctx.fillStyle = '#09F'       // Make changes to the settings
ctx.fillRect(15,15,120,120); // Draw a rectangle with new settings

ctx.save();                  // Save the current state
ctx.fillStyle = '#FFF'       // Make changes to the settings
ctx.globalAlpha = 0.5;    
ctx.fillRect(30,30,90,90);   // Draw a rectangle with new settings

ctx.restore();               // Restore previous state
ctx.fillRect(45,45,60,60);   // Draw a rectangle with restored settings

ctx.restore();               // Restore original state
ctx.fillRect(60,60,30,30);   // Draw a rectangle with restored settings
var out = fs.createWriteStream(__dirname + '/state.png')
  , stream = canvas.createPNGStream();

stream.on('data', function(chunk){
  out.write(chunk);
});*/


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

