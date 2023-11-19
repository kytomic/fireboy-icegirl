// Packages
const express = require('express');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const cors = require('cors');

// Middlewares
app.use(express.static('public'));
app.use(express.json());

const io = new Server(httpServer);
let playerCount = 0; 

// Http server connection
httpServer.listen(8000, () => {
    console.log('The game server has started...');
})

io.on('connection', (socket) => {
    socket.on('assign player', () => {
        playerCount++;
        if (playerCount <= 2) {
            playerCount = 1;
        }
        socket.emit('receive player', playerCount.toString());
    });

    socket.on('player1 move', (num) => {io.emit('move player1', num)})
    socket.on('player2 move', (num) => {io.emit('move player2', num)})
    socket.on('player1 stop', (num) => {io.emit('stop player1', num)})
    socket.on('player2 stop', (num) => {io.emit('stop player2', num)})

});
