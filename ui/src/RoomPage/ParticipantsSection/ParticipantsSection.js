import Partincipants from "./Participants";
import ParticipantsLabel from "./ParticipantsLabel";

import '../RoomPage.css'

const ParticipantsSection = () => {
    return (
        <div className="participants_section_container">
            <ParticipantsLabel />
            <Partincipants />
        </div>
    );
}
 
export default ParticipantsSection;