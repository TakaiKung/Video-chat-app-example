import React, { useState } from 'react';
import CameraButtonImg from '../../resources/camera.svg';
import CameraButtonImgOff from '../../resources/cameraOff.svg';

const CameraButton = () => {
    const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

    const handleCameraButtonPressed = () => {
        setIsLocalVideoDisabled(!isLocalVideoDisabled);
    };

    return (
        <div className='video_button_container'>
            <img
                src={ isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg }
                className='video_button_image'
                onClick={handleCameraButtonPressed}
                alt={'video'}
            />
        </div>
    );
}
 
export default CameraButton;