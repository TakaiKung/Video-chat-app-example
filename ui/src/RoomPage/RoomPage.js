import React, { useEffect } from "react";
import ChatSection from "./ChatSection/ChatSection";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import RoomLabel from "./RoomLabel";
import VideoSection from "./VideoSection/VideoSection";
import { connect } from "react-redux";
import * as WebRTCHandler from "../utils/webRTCHandler.js";

import './RoomPage.css';

const RoomPage = ({ roomId, identity, isRoomHost }) => {

    useEffect(() => {
       WebRTCHandler.getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId );
    }, []);

    return (
        <div className="room_container">
            <ParticipantsSection />
            <VideoSection />
            <ChatSection />
            <RoomLabel roomId={roomId} />
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return { ...state };
};
 
export default connect(mapStoreStateToProps)(RoomPage);