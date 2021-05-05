var sio
var gameSocket
var gamesInSession = []


const initializeGame = (io, client) => {
  sio = io
  gameSocket = client

  //create a game
  //join a game
  //new move

  // create a new rom per game
  //each room can only have 2 clients
  gamesInSession.push(gameSocket)

  gameSocket.on('disconnect', onDisconnect)
  gameSocket.on('new move', newMove)
  gameSocket.on('createNewGame', createNewGame)
  gameSocket.on('playerJoinGame', playerJoinGame)
  gameSocket.on('request username', requestUserName)
  gameSocket.on('received username', receivedUserName)
}

function onDisconnect() {

}

function newMove(){
  const gameId = move.gameId
  io.to(gameId).emit('opponenet move', move)

}

function createNewGame() {
  this.emit('createNewGame', {gameId: gameId, mySocketId: this.id})
  this.join(gameId)
}

function playerJoinGame(idData) {
  /**
    * Joins the given socket to a session with it's gameId
    */

   // A reference to the player's Socket.IO socket object
   var sock = this

   // Look up the room ID in the Socket.IO manager object.
   var room = io.sockets.adapter.rooms[idData.gameId]
  // console.log(room)

   // If the room exists...
   if (room === undefined) {
       this.emit('status' , "This game session does not exist." );
       return
   }
   if (room.length < 2) {
       // attach the socket id to the data object.
       idData.mySocketId = sock.id;

       // Join the room
       sock.join(idData.gameId);

       console.log(room.length)

       if (room.length === 2) {
           io.sockets.in(idData.gameId).emit('start game', idData.userName)
       }

       // Emit an event notifying the clients that the player has joined the room.
       io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);

   } else {
       // Otherwise, send an error message back to the player.
       this.emit('status' , "There are already 2 people playing in this room." );
   }
}

function requestUserName() {
  io.to(gameId).emit('give userName', this.id);
}

function receivedUserName() {
  data.socketId = this.id
  io.to(data.gameId).emit('get Opponent UserName', data);
}

exports.initializeGame = initializeGame
