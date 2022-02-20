import { setShowOverlay } from '../store/actions';
import store from '../store/store';
import * as wss from './wss';
import Peer from 'simple-peer';

const defaultConstrains = {
    audio : true,
    video : true
};

let localStream;


// get local preview and init room connection function
export const getLocalPreviewAndInitRoomConnection = async (isRoomHost, identity, roomId=null) => {
    // คำสั่งในการเอาค่า media จาก client
    navigator.mediaDevices.getUserMedia(defaultConstrains)
    .then(stream => { 
        console.log('success');
        localStream = stream;
        showLocalPreview(localStream);
        store.dispatch(setShowOverlay(false));
        isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId); 
    })
    .catch(error => console.log(error));
};

export const showLocalPreview = (stream) => {

};

const peers = {};
let streams = [];

// get rtc ice servers configuration
const getConfiguration = () => {
    return {
        iceServers : [
            {
                urls: 'stun:stun.l.goole.com:19302'
            }
        ]
    }
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const configuration = getConfiguration();
    peers[connUserSocketId] = new Peer({
        initiator: isInitiator,
        config : configuration,
        stream : localStream
    });

    peers[connUserSocketId].on('signal', (data) => {
        // WebRTC offer, WebRTC Answer (SDP information), ice candidates
        const signalData = {
            signal: data,
            connUserSocketId : connUserSocketId
        };
        wss.signalPeerData(signalData);
    });

    // add stream to peers
    peers[connUserSocketId].on('stream', (stream) => {
        console.log('new stream came');
        addStream(stream, connUserSocketId);
        streams = [...streams, stream]; // save new stream to streams array 
    });
};

export const handleSignalingData = (data) => {
    // add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
};

// display incoming stream
const addStream = (stream, connUserSocketId) => {

};



