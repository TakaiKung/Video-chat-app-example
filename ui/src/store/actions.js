const Actions = {
    SET_IS_ROOM_HOST : "SET_IS_ROOM_HOST",
    SET_CONNECTED_ONLY_WITH_AUDIO : "SET_CONNECTED_ONLY_WITH_AUDIO",
    SET_IDENTITY : 'SET_IDENTITY',
    SET_ROOM_ID : 'SET_ROOM_ID'
};

export const setIsRoomHost = (isRoomHost) => {
    return {
        type : Actions.SET_IS_ROOM_HOST,
        isRoomHost : isRoomHost
    }
}; 

export const setConnectOnlyWithAudio = (onlyWithAudio) => {
    return {
        type : Actions.SET_CONNECTED_ONLY_WITH_AUDIO,
        onlyWithAudio : onlyWithAudio
    }
};

export const setIdentity = (identity) => {
    return {
        type : Actions.SET_IDENTITY,
        identity
    }
};

export const setRoomId = (roomId) => {
    return {
        type : Actions.SET_IS_ROOM_HOST,
        roomId
    }
};

export default Actions;