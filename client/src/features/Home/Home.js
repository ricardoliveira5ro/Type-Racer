import Header from "../../components/Header/Header";
import Title from "./Title";
import GameOptions from "./GameOptions";

function Home() {
    return (
        <div className="px-10 py-7">
            <Header />
            <Title />
            <GameOptions />
        </div>
    );
}

export default Home;