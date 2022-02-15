import { useState } from "react";
import { connect } from "react-redux";
import { setConnectOnlyWithAudio } from "../store/actions";
import ErrorMessage from "./ErrorMessage";
import JoinRoomInput from "./JoinRoomInput";
import OnlyWithAudioCheckBox from "./OnlyAudioCheckBox";

const JoinRoomContent = (props) => {

    const { isRoomHost, setConnectOnlyWithAudio, connectedOnlyWithAudio } = props;
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    return ( 
        <>
            <JoinRoomInput 
                roomIdValue = { roomIdValue }
                nameValue = { nameValue }
                setNameValue = {setNameValue}
                isRoomHost = { isRoomHost }
                setRoomIdValue= { setRoomIdValue }
            />
            <OnlyWithAudioCheckBox 
                setConnectOnlyWithAudio={ setConnectOnlyWithAudio }
                connectOnlyWithAudio = { connectedOnlyWithAudio }
            />
            <ErrorMessage errorMessage={errorMessage}/>
        </>
    );
};

const mapStoreStateToProps = (state) => {
    return {...state};
};

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio : (onlyWithAudio) => dispatch(setConnectOnlyWithAudio(onlyWithAudio))
    }
};
 
export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent);