import { useEffect, useState } from 'react';
import CountUpTimer from '../Timer/CountupTimer';

function Race({ title }) {

    const [isRacing, setIsRacing] = useState(false);

    // To be changed, starting after the initial countdown
    useEffect(() => {
        setIsRacing(true)
    }, [])

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-center items-center gap-x-4'>
                <img src={require('../../assets/images/race-flag.webp')} alt='Race flag' />
                <p className='text-white text-2xl'>{title}</p>
            </div>
            <div className='flex justify-between items-center bg-white rounded-md px-5 py-3 w-full'>
                <div className='flex justify-between w-full'>
                    <p className='text-sm'>Type as fast as you can!</p>
                    <CountUpTimer isRacing={isRacing} />
                </div>
            </div>
        </div>
    );
}

export default Race;