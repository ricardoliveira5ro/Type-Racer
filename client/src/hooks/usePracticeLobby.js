import { useEffect, useState } from 'react';
import { LobbyAPI } from '../api/lobbyAPI';

export const usePracticeLobby = (isUserLoading, user) => {
    const [isLoading, setIsLoading] = useState(true)
    const [lobby, setLobby] = useState(null)

    useEffect(() => {
        if (isUserLoading) return

        const fetchLobby = async () => {
            setIsLoading(true)

            const isGuest = user ? false : true
            const { success, data } = await LobbyAPI.practice(isGuest)

            if (success) {
                setLobby({
                    players: data.lobby.players,
                    startCountDown: data.lobby.startCountDown,
                    code: data.lobby.code,
                    quote: data.lobby.quote
                })
            }
            setIsLoading(false)
        };

        fetchLobby();
    }, [user, isUserLoading]);

    return { lobby, isLoading }
};