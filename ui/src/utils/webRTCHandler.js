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
        showLocalPreview();
        // isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(roomId, identity); 
    })
    .catch(error => console.log(error));
};

export const showLocalPreview = (stream) => {

};