// Packages
const express = require('express');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const cors = require('cors');
const fs = require("fs");

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


    // Handling player movement
    socket.on('player move', (num) => {socket.broadcast.emit('move player', num);});
    socket.on('player stop', (num) => {socket.broadcast.emit('stop player', num);});
    socket.on('player jump', (cor) => {socket.broadcast.emit('jump player', cor);});
    socket.on('player fall', (cor) => {socket.broadcast.emit('fall player', cor);});

    socket.on('save score', (data) => {
        let scores = fs.readFileSync('./data/scores.json');

        if (scores.toJSON().data.length > 0) {
            scores = JSON.parse(fs.readFileSync('./data/scores.json'));
            if (scores.some(s => s.player1 == data.player1 && s.player2 == data.player2 && s.score == data.score)) {
                socket.emit('send scores', scores);
                return;
            }
        }else{
            scores = [];
        }

        scores.push({player1: data.player1, player2: data.player2, score: data.score});
    
        function compareByScore(a, b) {
            return a.score - b.score;
        }
        
        scores = scores.sort(compareByScore);
        scores = scores.reverse();
        fs.writeFileSync('./data/scores.json', JSON.stringify(scores));
        socket.emit('send scores', scores);
    })
});
