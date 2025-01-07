import Header from "../../components/Header/Header";
import Title from "./Title";
import GameOptions from "./GameOptions";
import HighScores from "./HighScores";

function Home() {
    return (
        <div className="px-10 py-7">
            <Header />
            <Title />
            <GameOptions />
            <HighScores />
        </div>
    );
}

export default Home;