// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This camera example takes a picture. If a
directory is specified with the --upload-dir
flag, the picture is saved to that directory.
*********************************************/

var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['D']);
var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);
var notificationLED = tessel.led[3]; // Set up an LED to notify when we're taking a picture
var playerNum = 1;
var player = require('./player.js');
// Wait for the camera module to say it's ready
function takePic () { 

    notificationLED.high();
    // Take the picture
    camera.takePicture(function(err, image) {
      if (err) {
        console.log('error taking image', err);
      } else {
        notificationLED.low();



        // Name the image
        var name = 'player' + playerNum++ + '.jpg';
        // Save the image
        console.log(playerNum)
        console.log('Picture saving as', name, '...');
        process.sendfile(name, image);
        players[playerNum-1] = new player( "Player " + playerNum, name );
        console.log('done.');
        // Turn the camera off to end the script
        if (playerNum === 3) {camera.disable();}
      }
    });

  camera.on('error', function(err) {
    console.error(err);
  });

}

var io = require('./server');
var message = require('./messages')(io);

var players = [];
var p1turn = true;

rfid.on('ready', function () {
  rfid.on('data', function(card){
    if (playerNum < 3 ) takePic();
    var uid = card.uid.toString('hex');
    
    if ( p1turn ) {

      if ( players[0].weapon === null ) {
        players[0].setItems( uid );
        message.send_player1_items( players[0] );
      } else {
        var damage = players[0].getDamageFromDiceroll( uid );
        players[1].dealDamage( damage );
        message.send_player2_damage( players[1] );
      }

    } else {

      if ( players[1].weapon === null ) {
        players[1].setItems( uid );
        message.send_player2_items( players[1] );
      } else {
        var damage = players[1].getDamageFromDiceroll( uid );
        players[0].dealDamage( damage );
        message.send_player1_damage( players[0] );
      }

    }

    p1turn = !p1turn;

    //player.setUid(uid);


  });
});

