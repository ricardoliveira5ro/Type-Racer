import { useEffect } from 'react';

import './Home.css'

import Header from "../../components/Header/Header";
import Title from "../../features/home/Title";
import GameOptions from "../../features/home/GameOptions";

function Home() {
    useEffect(() => {
        document.title = 'Type Racer';
    }, []);

    return (
        <div className="px-10 py-7">
            <Header />
            <Title />
            <GameOptions />
        </div>
    );
}

export default Home;