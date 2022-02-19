import { connect } from 'react-redux';

// const dummyParticipants = [
//     {
//         identity : 'Jake'
//     },
//     {
//         identity : 'Anna'
//     },
//     {
//         identity : 'Juke'
//     },
//     {
//         identity : 'Joke'
//     }
// ];

const SingleParticipant = (props) => {
    const { identity, lastItem } = props;
    return <>
        <p className="participants_paragraph">{ identity }</p>
        { !lastItem && <span className="participants_seperator_line"></span> }
    </>;
};

const Partincipants = ({ participants }) => {
    return (
        <div className="participants_container">
            { participants.map((participant, index) => {
                return (
                    <SingleParticipant
                        key = {participant.identity}
                        lastItem = {participants.length === index + 1}
                        participant = { participant }
                        identity = { participant.identity }
                    />
                );
            })};
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return { ...state }
};
 
export default connect(mapStoreStateToProps)(Partincipants);