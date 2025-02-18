import { useEffect, useState } from 'react';

import { useAppContext } from "../../context/AppContext"
import CountUpTimer from '../Timer/CountupTimer';

import './Race.css'

function Race({ title }) {

    const { quotes } = useAppContext()
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        setQuote(quotes[~~(Math.random() * quotes.length)])
    }, [quotes])

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
            <div className='flex flex-col justify-between items-center bg-white rounded-md px-5 py-3 w-full gap-y-4'>
                <div className='flex justify-between w-full'>
                    <p className='text-sm'>Type as fast as you can!</p>
                    <CountUpTimer isRacing={isRacing} />
                </div>

                <div className='flex flex-col w-full gap-y-6'>
                    <div className='flex items-center w-full gap-x-6'>
                        <div className='flex flex-col w-full'>
                            <div>
                                <img src={require('../../assets/images/car-green.webp')} alt='Car' />
                            </div>
                            <hr className='horizontal-bar'></hr>
                        </div>
                        <p className='min-w-fit'>41 wpm</p>
                    </div>
                    <div className='flex items-center w-full gap-x-6'>
                        <div className='flex flex-col w-full'>
                            <div>
                                <img src={require('../../assets/images/car-blue.webp')} alt='Car' />
                            </div>
                            <hr className='horizontal-bar'></hr>
                        </div>
                        <p className='min-w-fit'>41 wpm</p>
                    </div><div className='flex items-center w-full gap-x-6'>
                        <div className='flex flex-col w-full'>
                            <div>
                                <img src={require('../../assets/images/car-red.webp')} alt='Car' />
                            </div>
                            <hr className='horizontal-bar'></hr>
                        </div>
                        <p className='min-w-fit'>41 wpm</p>
                    </div><div className='flex items-center w-full gap-x-6'>
                        <div className='flex flex-col w-full'>
                            <div>
                                <img src={require('../../assets/images/car-yellow.webp')} alt='Car' />
                            </div>
                            <hr className='horizontal-bar'></hr>
                        </div>
                        <p className='min-w-fit'>41 wpm</p>
                    </div>

                    <div className='flex flex-col gap-y-4 mb-4'>
                        {quote &&
                            <p className='mt-4 text-xl text-justify'>{quote.text}</p>
                        }
                        <input placeholder='Type here' className='p-2 text-lg border-[1px] border-gray-400' type='text'></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Race;