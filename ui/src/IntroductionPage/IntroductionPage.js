import React, { useEffect } from "react";
import logo from "../resources/logo.png";
import ConnectingButtons from "./ConnectingButtons";
import { connect } from 'react-redux';

import './IntroductionPage.css';
import { setIsRoomHost } from "../store/actions";

const IntroductionPage = (props) => {

    const { setIsRoomHostAction } = props;

    useEffect(() => {
        setIsRoomHostAction(false);
    }, []);

    return (
        <div className="introduction_page_container">
            <div className="introduction_page_panel">
                <img alt="logo.png" src={ logo } className='introduction_page_image'></img>
                <ConnectingButtons />
            </div>
        </div>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost))
    };
};

export default connect(null, mapActionsToProps)(IntroductionPage);