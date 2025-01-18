import './Home.css'

import Header from "../../components/Header/Header";
import Title from "../../features/home/Title";
import GameOptions from "../../features/home/GameOptions";
import HighScores from "../../features/home/HighScores";

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