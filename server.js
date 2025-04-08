// import { Manager } from "socket.io-client";

// Global Variables
render = true; // render is the website used to hosted these files, set to false if hosted local

const myFunction = require('./functions.js');
const express = require('express')();
const app = express;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;
var connectionArr = new Array();
var msgArr = [];
var screenMessage = "";
var commandMessage = "";

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
    // command
    if (msg[0] === '/') {
      commandMessage = myFunction.getCommand(msg);
      socket.emit('chat message', commandMessage);
    } else {
      if (msgArr.findIndex(msg => msg.ip == clientIp) === -1) {
        msgArr.push({text: msg, ip: clientIp});
        screenMessage = "New Chatter: " + clientIp + ": " + msg;
      } else {
        msgArr.push({text: msg, ip: clientIp});
        screenMessage = clientIp + ": " + msg;
      }
      io.emit('chat message', screenMessage); // everyone sees the message
    }
  }); 


  socket.conn.on("packet", ({ type, data }) => {
    // called for each packet received
    console.log("Packet Information: " + type + " " + data);
  });

  // socket.on('connection', () => {
  //   const engine = socket.io.engine;
  //   console.log(engine.transport.name);
  //   engine.on("packet", ({ type, data }) => {
  //     // called for each packet received
  //     console.log("Packet Type: " + type + "\nData: " + data);
  //   });
  // });

});


// host server from port
server.listen(port, () => {
  // console.log("\nServer hosted locally on: " + myFunction.trimIp(socket.handshake.address) + "\n");
  // console.log("Using port " + port + " to listen.");
})