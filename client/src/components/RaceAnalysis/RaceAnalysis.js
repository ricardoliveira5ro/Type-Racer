import { Keyboard, Clock, CircleCheck, Trophy } from 'lucide-react';

import './RaceAnalysis.css'
import { timeFormat } from '../../utils/timeFormat';

function RaceAnalysis({ quote, stats }) {

    return (
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
    )
}

export default RaceAnalysis