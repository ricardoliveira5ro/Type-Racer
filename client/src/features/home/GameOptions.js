import { Link } from "react-router-dom";
import { Wand, BookText, Gamepad2 } from 'lucide-react';

function GameOptions() {
    return (
        <div>
            <div className='flex justify-center'><img src={require('../../assets/images/f1.webp')} alt='f1 icon' /></div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <Link to={'/multiplayer'} className="bg-[var(--grey)] rounded-md px-5 py-3">
                    <div className="flex items-center gap-x-2 mb-2">
                        <span className="text-white text-lg">Multiplayer</span>
                        <Gamepad2 color='white' size={22} />
                    </div>
                    <p className='text-white'>Join the global typing race! Compete against players from around the world and climb the leaderboard to prove you're the fastest typist.</p>
                </Link>
                <div className="grid grid-row-2 gap-4">
                    <Link to={'/practice'} className="bg-[var(--grey)] rounded-md px-5 py-3">
                        <div className="flex items-center gap-x-2 mb-2">
                            <span className='text-white text-lg'>Practice</span>
                            <BookText color='white' size={22} />
                        </div>
                        <p className='text-white'>Train at your own pace. Improve your speed and accuracy with focused practice sessions tailored to your progress.</p>
                    </Link>
                    <Link to={'/custom'} className="bg-[var(--green)] rounded-md px-5 py-3">
                        <div className="flex items-center gap-x-2 mb-2">
                            <span className='text-lg'>Custom</span>
                            <Wand size={22} />
                        </div>
                        <p>Create a private game and invite your friends to a personalized typing showdown. Perfect for friendly competitions!</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GameOptions