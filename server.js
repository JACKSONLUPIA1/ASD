const myFunction = require('./functions.js');

const express = require('express')();
const app = express;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
var connectionArr = new Array();

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

// on connect
io.on('connection', (socket) => {
  var clientIp = socket.handshake.headers['x-forwarded-for'] ? socket.handshake.headers['x-forwarded-for'] : socket.handshake.address;
  clientIp = myFunction.trimIp(clientIp);

  connectionArr.push(clientIp);
  console.log("user (" + clientIp + ") has connected\nConnection Array: " + connectionArr);


  // on disconnect
  socket.on('disconnect', () => {
    connectionArr.splice(connectionArr.lastIndexOf(clientIp));
    console.log("user (" + clientIp + ") has disconnected\nConnection Array: " + connectionArr);
  });

  // on send message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // everyone sees the message
    // console.log("user (" + clientIp + ") has sent a message: " + msg);
  })
});

// host server from port
server.listen(port, () => {
  // console.log("\nServer hosted locally on: " + myFunction.trimIp(socket.handshake.address) + "\n");
  // console.log("Using port " + port + " to listen.");
})