import { useEffect, useState } from 'react';
import { LobbyAPI } from '../api/lobbyAPI';

export const useCustomLobby = (isUserLoading, user, socket, create, code, showAlert) => {
    const [isLoading, setIsLoading] = useState(true)
    const [lobby, setLobby] = useState(null)

    useEffect(() => {
        if (isUserLoading || create === null) return

        const fetchLobby = async () => {
            setIsLoading(true)

            const params = { create, code }
            const isGuest = user ? false : true

            const { success, data, error } = await LobbyAPI.custom(socket.id, params, isGuest)

            if (success)
                setLobby(data.lobby)
            else
                showAlert('ERROR', error.response.data.message)

            setIsLoading(false)
        };

        fetchLobby();
    }, [create, code]); // eslint-disable-line react-hooks/exhaustive-deps

    const startRace = async (socketID, code) => {
        const { success, data } = await LobbyAPI.startCustom(socketID, code)

        if (success)
            setLobby(data.lobby)
    }

    return { lobby, isLoading, startRace }
};