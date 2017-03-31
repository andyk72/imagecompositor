/**
 * Express and Socket.io realtime collaboration server implementation
 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const config = require('./config');

// Instantiate express application

const app = express();

// ================================================================================= Middelwares

app.use(express.static(config.rootPath));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Init passport authentication

require('./authentication').init(app);

// Use session

app.use(session({
  store: new MongoDBStore({
    uri: config.mongoDBStore.uri,
    collection: config.mongoDBStore.collection
  }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
}))

// Use passport authentication

app.use(passport.initialize())
app.use(passport.session())

// ================================================================================= Routes

require('./routes').init(app);

// ================================================================================= Multiuser (socket.io)

/*
    [TODO]
        -> Sposta in /src/js/collaboration/server/server.js
        -> Istanzia solo se config.collaboration.enabled = true
*/

const http = require('http').Server(app);
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

// ================================================================================= Start Server 

http.listen(config.port, function(){
  console.log('Server listening on localhost:' + config.port);
});