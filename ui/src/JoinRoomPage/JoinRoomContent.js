import { useState } from "react";
import { connect } from "react-redux";
import { setConnectOnlyWithAudio } from "../store/actions";
import { getRoomExits } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButton from "./JoinRoomButton";
import JoinRoomInput from "./JoinRoomInput";
import OnlyWithAudioCheckBox from "./OnlyAudioCheckBox";
import { useNavigate } from "react-router-dom";

const JoinRoomContent = (props) => {

    const { isRoomHost, setConnectOnlyWithAudio, connectedOnlyWithAudio } = props;
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useNavigate();

    const handleJoinRoom = async () => {
        if (isRoomHost) {
            createRoom();
        }
        else {
            await joinRoom();
        }
    };

    const joinRoom = async () => {
        const responseMessage = await getRoomExits(roomIdValue);
        const { roomExits, full } = responseMessage;
        if (roomExits) {
            if (full) {
                setErrorMessage('Room is full');
            }
            else {
                history('/room');
            }
        }   
        else {
            setErrorMessage('Room not found');
        }
    };

    const createRoom = () => {
        history('/room')
    };

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
            <JoinRoomButton
                handleJoinRoom={handleJoinRoom}
                isRoomHost={isRoomHost}
            />
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