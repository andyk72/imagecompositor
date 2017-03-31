/**
 * STANDBY
 *  
 *  Attualmente non usato
 *  Vedi se riesci a usare questo file modularizzato per il collaboration server
 *  Attualmente il collaboration server è implementato in /src/js/server/server.js
 * 
 */

const io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');

  // listen to sprite.create -> broadcast
  socket.on('sprite.create', function(data) {
      console.log('Socket: sprite.create message received');
      console.log(data);
      socket.broadcast.emit('sprite.create', data);
  });

  // listen to sprite.delete -> broadcast
  socket.on('sprite.delete', function(data) {
      console.log('Socket: sprite.delete message received');
      console.log(data);
      socket.broadcast.emit('sprite.delete', data);
  });

  // listen to sprite.move -> broadcast
  socket.on('sprite.move', function(data) {
      console.log('Socket: sprite.move message received');
      console.log(data);
      socket.broadcast.emit('sprite.move', data);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});