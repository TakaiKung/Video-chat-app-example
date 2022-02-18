import React from "react";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import { connect } from "react-redux";
import SwitchToScreenSharing from "./SwitchToScreenSharing";

const VideoButtons = (props) => {
  const { connectOnlyWithAudio } = props;

  return (
    <div className="video_buttons_container">
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchToScreenSharing />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(VideoButtons);
