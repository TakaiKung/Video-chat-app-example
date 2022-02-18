const dummyParticipants = [
    {
        identity : 'Jake'
    },
    {
        identity : 'Anna'
    },
    {
        identity : 'Juke'
    },
    {
        identity : 'Joke'
    }
];

const SingleParticipant = (props) => {
    const { identity, lastItem, participant } = props;
    return <>
        <p className="participants_paragraph">{ identity }</p>
        { !lastItem && <span className="participants_seperator_line"></span> }
    </>;
};

const Partincipants = () => {
    return (
        <div className="participants_container">
            { dummyParticipants.map((participant, index) => {
                return (
                    <SingleParticipant
                        key = {participant.identity}
                        lastItem = { dummyParticipants.length }
                        participant = { participant }
                        identity = { participant.identity }
                    />
                );
            })};
        </div>
    );
};
 
export default Partincipants;