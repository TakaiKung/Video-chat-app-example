import { setShowOverlay } from '../store/actions';
import store from '../store/store';
import * as wss from './wss';

const defaultConstrains = {
    audio : true,
    video : true
};

let localStream;

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