import io from 'socket.io-client';

const SERVER = 'http://localhost:5002';

let socket = null;

export const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on('connect', () => {
        console.log('socket-client-has-conneted');
        console.log(`socket id : ${ socket.id }`);
    });
}; 