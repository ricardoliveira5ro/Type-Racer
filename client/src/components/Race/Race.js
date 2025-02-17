
function Race({ title }) {

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-center items-center gap-x-4'>
                <img src={require('../../assets/images/race-flag.webp')} alt='Race flag' />
                <p className='text-white text-2xl'>{title}</p>
            </div>
            <div className='flex justify-between items-center bg-white rounded-md px-5 py-3 w-full'>
                
            </div>
        </div>
    );
}

export default Race;