import React from "react";
import { useNavigate } from "react-router-dom";
import ConnectingButton from "./ConnectingButton";

const ConnectingButtons = () => {

    let history = useNavigate();

    const pushToJoinRoomPage = () => {
        history('/join_room');
    };

    const pushToJoinRoomPageAsHost = () => {
        history('/join_room?host=true');
    };

    return (
        <div className="connecting_buttons_container">
            <ConnectingButton buttonText='Join a meeting' onClickHandler={pushToJoinRoomPage} />
            <ConnectingButton createRoomButton={true} buttonText='Host a meeting' onClickHandler={pushToJoinRoomPageAsHost} />
        </div>
    );
};
 
export default ConnectingButtons;