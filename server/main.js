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
let playerIndex = 0; 
let are_players_ready = [false, false];

// Http server connection
httpServer.listen(8000, () => {
    console.log('The game server has started...');
})

io.on('connection', (socket) => {
    socket.on('assign player', () => {
        are_players_ready[playerIndex] = true;
        playerIndex++;
        if (playerIndex >= 2) {
            playerIndex = 0;
        }
        socket.emit('receive player', (playerIndex + 1).toString());
        
        if (are_players_ready[0] == true && are_players_ready[1] == true) {
            io.emit('player ready');
            are_players_ready[0] = false;
            are_players_ready[1] = false;
        }
    });

    socket.on('player1 move', (num) => {io.emit('move player1', num);})
    socket.on('player2 move', (num) => {io.emit('move player2', num);})
    socket.on('player1 stop', (num) => {io.emit('stop player1', num);})
    socket.on('player2 stop', (num) => {io.emit('stop player2', num);})
    socket.on('player1 jump', (cor) => {io.emit('jump player1', cor);})
    socket.on('player2 jump', (cor) => {io.emit('jump player2', cor);})
    socket.on('player1 fall', (cor) => {io.emit('fall player1', cor);})
    socket.on('player2 fall', (cor) => {io.emit('fall player2', cor);})

});
