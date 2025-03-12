import { useEffect, useState } from 'react';
import { LobbyAPI } from '../api/lobbyAPI';

export const useFindLobby = (isUserLoading, user) => {
    const [isLoading, setIsLoading] = useState(true)
    const [lobby, setLobby] = useState(null)

    useEffect(() => {
        if (isUserLoading) return

        const fetchLobby = async () => {
            setIsLoading(true)

            const isGuest = user ? false : true
            const { success, data } = await LobbyAPI.find(isGuest)

            if (success) {
                setLobby({
                    startCountDown: data.lobby.startCountDown,
                    code: data.lobby.code
                })
            }
            setIsLoading(false)
        };

        fetchLobby();
    }, [user, isUserLoading]);

    return { lobby, isLoading }
};