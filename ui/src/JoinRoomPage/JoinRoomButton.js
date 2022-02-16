import { useNavigate } from "react-router-dom";

const Button = ({ buttonText, cancelButton = false, onClickHandler  }) => {
    const buttonClass = cancelButton ? 'join_room_cancel_button' : 'join_room_success_button';
    return (
        <button className={ buttonClass } onClick={ onClickHandler }>
            { buttonText }
        </button>
    );
}; 

const JoinRoomButton = ({ handleJoinRoom, isRoomHost }) => {

    const history = useNavigate();
    const successButtonText = isRoomHost ? 'Host' : 'Join';

    const pushToIntroductionPage = () => {
        history('/');
    };

    return (
        <div className="join_room_buttons_container">
            <Button
                buttonText={successButtonText}
                onClickHandler={handleJoinRoom}
            />
            <Button
                buttonText={'Cancel'}
                cancelButton
                onClickHandler={pushToIntroductionPage}
            />
        </div>
    );
}
 
export default JoinRoomButton;