import React, { useState } from 'react';

import './Home.css'

function HighScores() {

    const [activeTab, setActiveTab] = useState('Weekly');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const dummyScores = [
        { name: 'ricardo5', accuracy: 98, wpm: 153.82 },
        { name: 'oliveira5', accuracy: 95, wpm: 152.64 },
        { name: 'ricardo5', accuracy: 98, wpm: 151.82 },
        { name: 'oliveira5', accuracy: 95, wpm: 150.64 },
        { name: 'ricardo5', accuracy: 98, wpm: 149.82 },
        { name: 'oliveira5', accuracy: 95, wpm: 148.64 },
        { name: 'ricardo5', accuracy: 98, wpm: 147.82 },
        { name: 'oliveira5', accuracy: 95, wpm: 146.64 },
        { name: 'ricardo5', accuracy: 98, wpm: 147.82 },
        { name: 'oliveira5', accuracy: 95, wpm: 146.64 },
        { name: 'ricardo5', accuracy: 98, wpm: 147.82 },
        { name: 'oliveira5', accuracy: 95, wpm: 146.64 }
    ]

    return (
        <div className='mt-8'>
            <div className='flex justify-center items-center gap-x-3'>
                <img src={require('../../trophy.webp')} alt='Trophy icon' />
                <h3 className='text-2xl text-[#ffbc00]'>High Scores</h3>
            </div>
            <div className='flex justify-center items-center mt-8'>
                <div className='grid grid-row-2 bg-[var(--grey)] rounded-md w-full max-w-4xl'>
                    <div className='grid grid-cols-3 text-center tabs'>
                        {['Weekly', 'Monthly', 'All-Time'].map((tab) => (
                            <button key={tab} className={`px-5 py-3 ${activeTab === tab ? 'active' : ''}`} onClick={() => handleTabClick(tab)}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className='pt-4'>
                        <table className='high-score-table'>
                            <thead>
                                <tr>
                                    <th className="number-col">#</th>
                                    <th className="name-col">Name</th>
                                    <th className="other-col">Accuracy</th>
                                    <th className="other-col">WPM</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyScores.map((score, index) => (
                                    <tr key={index}>
                                        <td className="number-col">{index + 1}</td>
                                        <td className="name-col">{score.name}</td>
                                        <td className="other-col">{score.accuracy}%</td>
                                        <td className="other-col">{score.wpm}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HighScores