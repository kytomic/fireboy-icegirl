const Socket = (function() {
    // This stores the current Socket.IO socket
    let socket = null;
    let playerNum = null;

    // This function gets the socket from the module
    const getSocket = function() {
        return socket;
    };

    // This function connects the server and initializes the socket
    const connect = function() {
        socket = io();

        // Wait for the socket to connect successfully
        socket.on("connect", () => {
            console.log('Websocket is connecting...');
        });
        
        // Wait for player num
        socket.on("receive player", num => {
            playerNum = num;
        });
    };

    // This function disconnects the socket from the server
    const disconnect = function() {
        socket.disconnect();
        socket = null;
    };

    const assignPlayer = function() {
        if (socket && socket.connected)
            socket.emit("assign player");
    }

    return { getSocket, connect, disconnect, postMessage, assignPlayer};
})();
