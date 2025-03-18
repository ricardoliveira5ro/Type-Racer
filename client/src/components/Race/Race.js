import { useEffect } from 'react';

import { useQuoteTyping } from '../../hooks/useQuoteTyping';

import { carColor } from '../../utils/carColor'

import CountUpTimer from '../Timer/CountupTimer';
import CountDownTimer from '../Timer/CountdownTime';
import RaceAnalysis from '../RaceAnalysis/RaceAnalysis';

import './Race.css'

function Race({ socket, mode, lobby }) {

    const { isRacing, setIsRacing, hasEnded, typedWords, remainingWords, correctWordPart, wrongWordPart, currentWord, userInput, setUserInput, userInputRef, inputBgColor, wpm, accuracy, elapsedTime, setElapsedTime } = useQuoteTyping(lobby.quote)

    useEffect(() => {
        let timerId
        
        timerId = setTimeout(() => {
            setIsRacing(true)
            userInputRef.current.disabled = false
            userInputRef.current.focus()
        }, 15000);
    
        return () => clearTimeout(timerId)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!socket) return

        socket.emit("joinRoom", lobby.code); // Join the room

        socket.on("playerJoined", (data) => {
            if (data.lobby.code === lobby.code) {
                lobby.players = data.lobby.players;
                console.log("New player joined in the room", lobby.code);
            }
        });

        return () => {
            socket.off("playerJoined");
        }
    }, [socket, lobby])

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-center items-center gap-x-4'>
                <img src={require('../../assets/images/race-flag.webp')} alt='Race flag' />
                <p className='text-white text-2xl'>{mode}</p>
            </div>
            {(!isRacing && !typedWords) && <CountDownTimer />}
            <div className='flex flex-col justify-between items-center bg-white rounded-md px-5 py-3 w-full gap-y-4'>
                {isRacing &&
                    <div className='flex justify-between w-full'>
                        <p className='text'>Type as fast as you can!</p>
                        <CountUpTimer isRacing={isRacing} setElapsedTime={setElapsedTime} />
                    </div>
                }
                {hasEnded && 
                    <div className='flex justify-between w-full'>
                        <p className='text-lg'>{mode === 'Practice' ? 'The race has ended' : 'You finished 1st'}</p>
                    </div>
                }
                <div className='flex flex-col w-full gap-y-6'>
                    {lobby.players?.map((player, index) => (
                        <div key={player.user || index} className='flex items-center w-full gap-x-6'>
                            <div className='flex flex-col w-full'>
                                <div id={`div-car-${index + 1}`}>
                                    <img id={`img-car-${index + 1}`} src={carColor(index + 1)} alt='Car' />
                                </div>
                                <hr className='horizontal-bar'></hr>
                                <p>{player.playerName}</p>
                            </div>
                            <p className='min-w-fit'>{wpm} wpm</p>
                        </div>
                    ))}

                    <div className='flex flex-col gap-y-4 mb-4'>
                        {lobby.quote &&
                            <p className='quote'>
                                <span className="text-green-600">{typedWords} </span>
                                <span className="text-green-600">{correctWordPart}</span>
                                <span className="text-red-700 bg-red-200">{wrongWordPart}</span>
                                <span className="underline">{currentWord?.slice(userInput.length)}</span>
                                <span className="text-black"> {remainingWords}</span>
                            </p>
                        }
                        <input onChange={(e) => setUserInput(e.target.value)} value={userInput} ref={userInputRef} 
                            placeholder='Type here' type='text' disabled className={`p-2 text-lg border-[1px] rounded-md border-gray-400 ${inputBgColor}`}>
                        </input>
                    </div>
                </div>
            </div>
            {hasEnded && <RaceAnalysis quote={lobby.quote} stats={{ wpm, accuracy, elapsedTime, position: 1 }} />}
        </div>
    );
}

export default Race;