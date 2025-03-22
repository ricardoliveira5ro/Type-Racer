import { useOnlinePlayers } from "../../hooks/useOnlinePlayers"

function CustomJoinLobby () {

    const { isLoading: isOnlinePlayersLoading, onlinePlayers } = useOnlinePlayers()

    return (
        <div className="flex flex-col px-4 py-3 items-center justify-center bg-white rounded-md gap-y-5 min-w-96">
            <span className="text-xl">Custom</span>
            <input type="text" placeholder="Lobby Code" className="px-4 py-1.5 border rounded-md w-full" />
            <div className="flex flex-col gap-y-2 w-full">
                <button className="w-full px-4 py-1.5 rounded-md bg-[var(--green)]">Join Lobby</button>
                <button className="w-full px-4 py-1.5 rounded-md bg-black text-white">Create</button>
            </div>
            <div className="flex items-center gap-x-2 w-full px-0.5 mb-1">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                {!isOnlinePlayersLoading && <p>{onlinePlayers} Online Players</p>}
            </div>
        </div>
    )
}

export default CustomJoinLobby