import React, { useState } from "react";
import SwitchImg from '../../resources/switchToScreenSharing.svg';

const SwitchToScreenSharing = () => {
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);

    const handleScreenShareToggle = () => {
        setIsScreenSharingActive(!isScreenSharingActive);
    };

    return (
        <div className="video_button_container">
            <img
                src={ SwitchImg }
                onClick={handleScreenShareToggle}
                alt={'sharescreen'}
            />
        </div>
    );
}
 
export default SwitchToScreenSharing;