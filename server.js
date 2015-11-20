var express = require('express');
var fs = require('fs');
var socketio = require('socket.io');

var app = express();//????????

var server = app.listen(8000, function() {
  console.log( "SERVER READY ON PORT 80" );
});
var io = socketio.listen( server );

app.get('/', function( req, res, next ) {
  fs.readFile('index.html', 'utf8', function( err, page ) {
    res.type('html').send( page );
  });
});

app.get('/style/style.css', function( req, res, next ) {
  fs.readFile('style/style.css', 'utf8', function( err, css ) {
    res.type('css').send( css );
  })
});

module.exports = io;
