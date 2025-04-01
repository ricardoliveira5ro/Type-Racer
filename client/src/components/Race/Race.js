import { useEffect, useState } from 'react';

import { StatsAPI } from '../../api/statsAPI'
import { LobbyAPI } from '../../api/lobbyAPI'

import { useQuoteTyping } from '../../hooks/useQuoteTyping';

import { carColor } from '../../utils/carColor'

import CountUpTimer from '../Timer/CountupTimer';
import CountDownTimer from '../Timer/CountdownTimer';
import RaceAnalysis from '../RaceAnalysis/RaceAnalysis';

import './Race.css'
import { Copy } from 'lucide-react';

function Race({ socket, mode, initialLobby, isGuest }) {

    const [lobby, setLobby] = useState(initialLobby)
    const [finalPosition, setFinalPosition] = useState(1)
    
    const { isRacing, setIsRacing, hasEnded, wordIndex, typedWords, remainingWords, correctWordPart, wrongWordPart, currentWord, userInput, setUserInput, userInputRef, inputBgColor, wpm, accuracy, elapsedTime, setElapsedTime, distanceToMove } 
            = useQuoteTyping(initialLobby.quote, lobby.players.findIndex(p => p.user === socket.id))

    useEffect(() => {
        if (!lobby.startCountDown) return 

        let timerId
        
        timerId = setTimeout(() => {
            setIsRacing(true)
            userInputRef.current.disabled = false
            userInputRef.current.focus()
        }, 6000);
    
        return () => clearTimeout(timerId)
    }, [lobby.startCountDown]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!socket) return

        socket.emit("joinRoom", lobby.code); // Join the room

        socket.on("playerJoined", (data) => {
            if (data.lobby.code === lobby.code)
                setLobby(data.lobby)
        });

        socket.on("player-disconnected", (data) => {
            if (data.lobby.code === lobby.code)
                setLobby(data.lobby)
        });

        socket.on("countdown-started", (data) => {
            if (data.lobby.code === lobby.code)
                setLobby(data.lobby)
        })

        socket.on("player-progress", (data) => {
            if (data.lobby.code === lobby.code) {
                setLobby(data.lobby)

                data.lobby.players.forEach((player, index) => {
                    const carImg = document.getElementById(`img-car-${index + 1}`)
                    if (!carImg || !distanceToMove) return

                    carImg.style.transform = `translateX(${(distanceToMove * player.wordIndex)}px)`
                });
            }
        })

        return () => {
            socket.off("playerJoined");
            socket.off("countdown-started");
            socket.off("player-progress");
            socket.off("player-disconnected");
        }
    }, [socket, lobby, distanceToMove])

    useEffect(() => {
        if (!socket) return

        const update = {
            socketID: socket.id,
            wpm: wpm,
            wordIndex: wordIndex,
            hasFinished: hasEnded
        }

        // Update current client/sender
        setLobby(prevState => ({
            ...prevState,
            players: prevState.players.map(player => player.user === socket.id ? 
                { ...player, wpm: update.wpm, wordIndex: update.wordIndex, hasFinished: hasEnded } : player
            )
        }))

        socket.emit("word-typed", { lobby, update });

    }, [socket, wpm]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const finalLobby = lobby.players.map(player => player.user === socket.id ? 
                                                { ...player, hasFinished: true } : player
                                            )

        const filteredPlayers = finalLobby.filter(player => (player.hasFinished || player.user === socket.id))
        const sortedPlayers = filteredPlayers.sort((a, b) => b.wpm - a.wpm)

        const position = sortedPlayers.findIndex(player => player.user === socket.id) + 1
        setFinalPosition(position)

        if (!hasEnded || isGuest || mode === 'Practice') return

        const formData = {
            wpm: wpm,
            accuracy: accuracy,
            position: position
        }

        const updateStats = async () => {
            await StatsAPI.postRaceStats(formData)
        }

        updateStats()

    }, [hasEnded]) // eslint-disable-line react-hooks/exhaustive-deps

    // Leaving lobby (not closing socket)
    useEffect(() => {
        return () => {
            const updateOrDelete = async () => {
                await LobbyAPI.updateOrDeleteOnUserLeave(socket.id, lobby.code)
            }
            updateOrDelete()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const startRace = async (socketID, code) => {
        const { success, data } = await LobbyAPI.startCustom(socketID, code)

        if (success)
            setLobby(data.lobby)
    }

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex justify-center items-center gap-x-4'>
                <img src={require('../../assets/images/race-flag.webp')} alt='Race flag' />
                <p className='text-white text-2xl'>{mode}</p>
            </div>
            {(!isRacing && !typedWords) && <CountDownTimer lobby={lobby} />}
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
                                <p>{socket.id === player.user ? 'You' : player.playerName}</p>
                            </div>
                            <p className='min-w-fit'>{socket.id === player.user ? ~~wpm : ~~player.wpm} wpm</p>
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
            {(mode === 'Custom' && !lobby.startCountDown) &&
                <div className="flex items-center w-full gap-x-6">
                    <div className='flex items-center gap-x-2 cursor-pointer' onClick={() => navigator.clipboard.writeText(lobby.code)}>
                        <p className="text-white">Code:</p>
                        <span className='text-[var(--green)] text-lg'>{lobby.code}</span>
                        <Copy color="white" />
                    </div>
                    {socket.id === lobby.players[0].user &&
                        <button onClick={() => startRace(socket.id, lobby.code)} className='px-8 py-1.5 rounded-md bg-[var(--green)]'>Start Race</button>
                    }
                </div>
            }
            {hasEnded && <RaceAnalysis quote={initialLobby.quote} stats={{ wpm, accuracy, elapsedTime, position: finalPosition }} />}
        </div>
    );
}

export default Race;