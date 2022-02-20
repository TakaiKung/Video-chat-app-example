import io from 'socket.io-client';
import { setRoomId, setParticipants } from '../store/actions';
import store from '../store/store';
import * as WebRTCHandler from './webRTCHandler'
const SERVER = 'http://localhost:5002';

let socket = null;

/**
 * Connect to the socket server and listen for events.
 */
export const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on('connect', () => {
        console.log('socket-client-has-conneted');
        console.log(`socket id : ${ socket.id }`);
    });

    socket.on('room-id', (data) => {
        const { roomId } = data;
        store.dispatch(setRoomId(roomId));
    });

    socket.on('room-update', (data) => {
        const { connectedUsers } = data;
        console.log(connectedUsers); 
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on('conn-prepare', (data) => {
        const { connUserSocketId } = data;
        WebRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
        // inform the user which just join the room that we have prepared for incoming connection
        socket.emit('conn-init', { connUserSocketId: connUserSocketId })
    });

    socket.on('conn-signal', (data) => {
        WebRTCHandler.handleSignalingData(data);
    });

    socket.on('conn-init', (data) => {
        const { connUserSocketId } = data;
        WebRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });

}; 

/*
create new room and emit event
*/
export const createNewRoom = (identity) => {
    const data = { identity };
    socket.emit('create-new-room', data);
};

/**
 * It sends a message to the server to join a room.
 * @param identity - The name of the user.
 * @param roomId - The room ID that you want to join.
 */
export const joinRoom = (identity, roomId) => {
    const data = {
        roomId,
        identity
    };  
    socket.emit('join-room', data);

};

/**
 * Send a signal to the server that the peer has data to send
 * @param data - The data to send to the peer.
 */
export const signalPeerData = (data) => {
    socket.emit('conn-signal', data);
};