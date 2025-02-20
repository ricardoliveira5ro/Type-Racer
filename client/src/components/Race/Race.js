import { useEffect, useRef, useState } from 'react';

import { useAppContext } from "../../context/AppContext"
import CountUpTimer from '../Timer/CountupTimer';

import './Race.css'

function Race({ title }) {

    const { quotes } = useAppContext()
    const [quote, setQuote] = useState(null)

    const [typedWords, setTypedWords] = useState([])
    const [remainingWords, setRemainingWords] = useState([])

    const inputRef = useRef(null)

    useEffect(() => {
        const tmpQuote = quotes[~~(Math.random() * quotes.length)]
        
        setQuote(tmpQuote)
        tmpQuote && setRemainingWords(tmpQuote.text.split(' '))
    }, [quotes])

    const [isRacing, setIsRacing] = useState(false);

    // To be changed, starting after the initial countdown
    useEffect(() => {
        setIsRacing(true)
    }, [])

    const inputChange = (e) => {
        if (e.target.value.slice(-1) === ' ' && remainingWords.length > 0 && remainingWords[0] === e.target.value.split(' ')[0]) {
            setTypedWords([...typedWords, remainingWords[0]])
            setRemainingWords(remainingWords.slice(1))

            inputRef.current.value = ''
            return
        }
    }


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
                        <input onChange={(e) => inputChange(e)} ref={inputRef} placeholder='Type here' className='p-2 text-lg border-[1px] border-gray-400' type='text'></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Race;