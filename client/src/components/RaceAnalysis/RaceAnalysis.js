import { Keyboard, Clock, CircleCheck, Trophy } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { timeFormat } from '../../utils/timeFormat';

import './RaceAnalysis.css'

function RaceAnalysis({ quote, stats }) {

    const navigate = useNavigate()

    return (
        <div>
            <div className="flex flex-col justify-between items-center bg-white rounded-md p-5 w-full gap-y-4">
                <div className="w-full">
                    <p>You just typed a quote from the book:</p>
                </div>
                <div className="race-analysis-container flex items-center w-full gap-x-8 gap-y-6">
                    <div className="race-quote-container flex flex-col px-5 py-2 rounded-md bg-[var(--green)]">
                        <span className="text-white">{quote?.source}</span>
                        <p className="text-white">by {quote?.author}</p>
                    </div>
                    <div className="race-stats-container flex flex-wrap items-center gap-x-8 gap-y-4">
                        <div className='flex items-center gap-x-2'>
                            <Keyboard color='#86C232' size={28} />
                            <span>{stats?.wpm} wpm</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <Clock color='#86C232' size={28} />
                            <span>{timeFormat(stats?.elapsedTime)}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <CircleCheck color='#86C232' size={28} />
                            <p>Accuracy: <span>{stats?.accuracy}%</span></p>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <Trophy color='#86C232' size={28} />
                            <span>{stats?.position === 1 ? 'Winner' : stats?.position}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => navigate('/home')} className='bg-[var(--green)] px-4 py-2 rounded-md text-white mt-6'>Main Menu</button>
        </div>
    )
}

export default RaceAnalysis