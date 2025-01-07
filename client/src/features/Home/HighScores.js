function HighScores() {
    return (
        <div className='mt-8'>
            <div className='flex justify-center items-center gap-x-3'>
                <img src={require('../../trophy.webp')} alt='Trophy icon' />
                <h3 className='text-2xl text-[#ffbc00]'>High Scores</h3>
            </div>
            <div className='flex justify-center items-center mt-8'>
                <div className='grid grid-row-2 bg-[var(--grey)] rounded-md px-5 py-3 w-full max-w-4xl'>
                    <div className='grid grid-cols-3'>
                        <button>Weekly</button>
                        <button>Monthly</button>
                        <button>All-Time</button>
                    </div>
                    <div>Records</div>
                </div>
            </div>
        </div>
    )
}

export default HighScores