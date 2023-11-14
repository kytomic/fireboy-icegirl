import io from 'socket.io-client';

export const Socket = () => {
    // This stores the current Socket.IO socket
    let socket = null;

    // This function gets the socket from the module
    const getSocket = function() {
        return socket;
    };

    // This function connects the server and initializes the socket
    const connect = function() {
        socket = io.connect(`http://localhost:8000`);
    };

    return {getSocket, connect};
}
