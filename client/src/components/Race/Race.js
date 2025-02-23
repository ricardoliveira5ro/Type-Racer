import { useEffect, useState } from 'react';
import { useQuoteTyping } from '../../hooks/useQuoteTyping';

import CountUpTimer from '../Timer/CountupTimer';

import './Race.css'

function Race({ title }) {

    const { quote, typedWords, remainingWords, correctWordPart, wrongWordPart, currentWord, userInput, setUserInput, inputBgColor } = useQuoteTyping()

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
                            <p className='quote'>
                                <span className="text-green-600">{typedWords} </span>
                                <span className="text-green-600">{correctWordPart}</span>
                                <span className="text-red-700 bg-red-200">{wrongWordPart}</span>
                                <span className="underline">{currentWord?.slice(userInput.length)}</span>
                                <span className="text-black"> {remainingWords}</span>
                            </p>
                        }
                        <input onChange={(e) => setUserInput(e.target.value)} value={userInput} placeholder='Type here' type='text'
                           className={`p-2 text-lg border-[1px] rounded-md border-gray-400 ${inputBgColor}`}>
                        </input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Race;