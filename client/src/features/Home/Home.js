import Header from "../../components/Header/Header";
import { Wand, BookText, Gamepad2 } from 'lucide-react';

function Home() {
    return (
        <div className="px-10 py-7">
            <Header />
            <div className="my-8">
                <hr className="border-[var(--grey)]"></hr>
                <div className="my-5">
                    <h1 className="text-[var(--green)] text-center text-2xl mb-3">Accelerate Your Typing Skills!</h1>
                    <p className="text-[var(--grey)] text-center">Compete against friends, practice at your own pace, and create custom challenges to become a typing champion. Whether you're here for fun or skill-building, this is your arena!</p>
                </div>
                <hr className="border-[var(--grey)]"></hr>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-md px-5 py-3">
                    <div className="flex items-center gap-x-2 mb-2">
                        <span className="text-lg">Multiplayer</span>
                        <Gamepad2 size={22} />
                    </div>
                    <p>Join the global typing race! Compete against players from around the world and climb the leaderboard to prove you're the fastest typist.</p>
                </div>
                <div className="grid grid-row-2 gap-4">
                    <div className="bg-white rounded-md px-5 py-3">
                        <div className="flex items-center gap-x-2 mb-2">
                            <span>Practice</span>
                            <BookText size={22} />
                        </div>
                        <p>Train at your own pace. Improve your speed and accuracy with focused practice sessions tailored to your progress.</p>
                    </div>
                    <div className="bg-white rounded-md px-5 py-3">
                        <div className="flex items-center gap-x-2 mb-2">
                            <span>Custom</span>
                            <Wand size={22} />
                        </div>
                        <p>Create a private game and invite your friends to a personalized typing showdown. Perfect for friendly competitions!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;