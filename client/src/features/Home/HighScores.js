import React, { useState } from 'react';

import './Home.css'

function HighScores() {

    const [activeTab, setActiveTab] = useState('Weekly');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                    <div className='p-6'>Records</div>
                </div>
            </div>
        </div>
    )
}

export default HighScores