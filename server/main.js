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

// const corsOptions = {
//     origin: 'http://localhost:8000',
//     methods: 'GET, PUT, POST, DELETE',
// };

// app.use(cors(corsOptions));

// const io = new Server(httpServer, {
//     cors: {
//         origin: 'http://localhost:8000',
//         methods: ['GET', 'POST'],
//     }
// });

const io = new Server(httpServer);

// Http server connection
httpServer.listen(8000, () => {
    console.log('The game server has started...');
})

io.on('connection', (socket) => {
    socket.on('msg', msg => {
        console.log(msg)
    });
});
