import { useEffect } from 'react';

import { Car, Copy } from 'lucide-react';

function CustomLobby({ socket, lobby, setLobby }) {

    useEffect(() => {
        if (!socket) return

        socket.on("player-joined-custom", (data) => {
            if (data.lobby.code === lobby.code)
                setLobby(data.lobby)
        });

        socket.on("player-disconnected", (data) => {
            if (data.lobby.code === lobby.code)
                setLobby(data.lobby)
        })

        return () => {
            socket.off("player-disconnected");
            socket.off("player-joined-custom");
        }
    }, [socket, lobby, setLobby])

    // Leaving lobby (not closing socket)
    useEffect(() => {
        return () => {
            socket.emit('player-left-custom', { lobby, user: socket.id })
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col px-4 py-3 items-center justify-center bg-white rounded-md gap-y-4 min-w-96">
            <span className="text-xl">Lobby</span>
            <div className="flex flex-col w-full gap-y-2">
                <p>Players</p>
                {lobby.players?.map((player, index) => (
                    <div key={index} className={`flex items-center px-2 py-1 rounded-md border gap-x-2 ${index % 2 === 0 ? 'border-black' : 'border-[var(--green)]'}`}>
                        <Car color={`${index % 2 === 0 ? 'black' : '#86C232'}`} />
                        <p>{player.playerName}</p>
                    </div>
                ))}
            </div>
            <div className='flex items-center w-full gap-x-8 my-2'>
                <div className='flex gap-x-2 cursor-pointer' onClick={() => navigator.clipboard.writeText(lobby.code)}>
                    <p className='text-lg'>{lobby.code}</p>
                    <Copy />
                </div>
                {socket.id === lobby.players[0].user &&<button className='w-full px-4 py-1.5 rounded-md bg-[var(--green)]'>Start Race</button>}
            </div>
        </div>
    )
}

export default CustomLobby