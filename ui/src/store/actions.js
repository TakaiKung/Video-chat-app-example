const Actions = {
    SET_IS_ROOM_HOST : "SET_IS_ROOM_HOST",
    SET_CONNECTED_ONLY_WITH_AUDIO : "SET_CONNECTED_ONLY_WITH_AUDIO"
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

export default Actions;