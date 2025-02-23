import { useEffect, useRef, useState } from 'react';

import { useQuoteTyping } from '../../hooks/useQuoteTyping';

import { carColor } from '../../utils/carColor'

import CountUpTimer from '../Timer/CountupTimer';
import CountDownTimer from '../Timer/CountdownTime';

import './Race.css'

function Race({ title, players }) {

    const { quote, typedWords, remainingWords, correctWordPart, wrongWordPart, currentWord, userInput, setUserInput, inputBgColor } = useQuoteTyping()
    const userInputRef = useRef(null)

    const [isRacing, setIsRacing] = useState(false);

    // To be changed, starting after the initial countdown
    useEffect(() => {
        let timerId
        
        timerId = setTimeout(() => {
            setIsRacing(true)
            userInputRef.current.disabled = false
            userInputRef.current.focus()
        }, 15000);
    
        return () => clearTimeout(timerId)
    }, [])

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-center items-center gap-x-4'>
                <img src={require('../../assets/images/race-flag.webp')} alt='Race flag' />
                <p className='text-white text-2xl'>{title}</p>
            </div>
            {!isRacing && <CountDownTimer />}
            <div className='flex flex-col justify-between items-center bg-white rounded-md px-5 py-3 w-full gap-y-4'>
                {isRacing &&
                    <div className='flex justify-between w-full'>
                        <p className='text-sm'>Type as fast as you can!</p>
                        <CountUpTimer isRacing={isRacing} />
                    </div>
                }

                <div className='flex flex-col w-full gap-y-6'>
                    {players?.map((player, index) => (
                        <div key={index} className='flex items-center w-full gap-x-6'>
                            <div className='flex flex-col w-full'>
                                <div>
                                    <img src={carColor(index + 1)} alt='Car' />
                                </div>
                                <hr className='horizontal-bar'></hr>
                                <p>{player.username}</p>
                            </div>
                            <p className='min-w-fit'>0 wpm</p>
                        </div>
                    ))}

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
                        <input onChange={(e) => setUserInput(e.target.value)} value={userInput} ref={userInputRef} placeholder='Type here' type='text' disabled
                           className={`p-2 text-lg border-[1px] rounded-md border-gray-400 ${inputBgColor}`}>
                        </input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Race;