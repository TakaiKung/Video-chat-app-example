import Actions from "./actions";

const initState = {
    identity : '',
    isRoomHost : false,
    connectedOnlyWithAudio : false
};

const reducer = ( state = initState, action ) => {
    switch (action.type) {
        case Actions.SET_IS_ROOM_HOST :
            return { ...state, isRoomHost : action.isRoomHost };
        case Actions.SET_CONNECTED_ONLY_WITH_AUDIO :
            return { ...state, connectedOnlyWithAudio : action.onlyWithAudio }
        default:
            return state;
    }
};

export default reducer;