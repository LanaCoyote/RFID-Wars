module.exports = function(io) {
  return {

    send_player1_login = function( player ) {
      io.sockets.emit( 'player1_login', player );  
    }

    send_player2_login = function( player ) {
      io.sockets.emit( 'player2_login', player );
    }

    send_player1_items = function( player ) {
      io.sockets.emit( 'player1_items', player );
    }

    send_player2_items = function( player ) {
      io.sockets.emit( 'player2_items', player );
    }

    send_player1_damage = function( player ) {
      io.sockets.emit( 'player1_damage', player );
    }

    send_player2_damage = function( player ) {
      io.sockets.emit( 'player2_damage', player );
    } 

  }
}
