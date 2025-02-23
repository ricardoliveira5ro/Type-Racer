import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

function Practice() {

    // To be implemented as a lobby
    const players = [
        { username: 'ricardo5ro' },
        { username: 'player123' },
        { username: 'keyboardwarrior' },
        { username: 'xTyper212' }
    ]

    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            <Race title={'Practice'} players={players} />
        </div>
    );
}

export default Practice;