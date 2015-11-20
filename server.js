// Running on your computer.

var express = require('express');
var http = require('http');
var fs = require('fs');
var server = http.createServer();
var app = express();

server.on('request', app);

server.listen(3001, function () {
 console.log('Server on.');
});

app.post('/upload-pic', function (req, res, next) {

    console.log('Request received');

    var imageData = new Buffer(0);

    req.on('data', function (chunk) {
        imageData = Buffer.concat([imageData, chunk]);
    });

    req.on('end', function () {
       // Full image ready.
        fs.writeFile('./'+ Date.now().toString() + '.jpg', imageData);
    });

});