import { useEffect, useState } from 'react';
import { UsersAPI } from '../api/usersAPI';

export const useOnlinePlayers = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [onlinePlayers, setOnlinePlayers] = useState(1)

    useEffect(() => {
        const fetchOnlinePlayers = async () => {
            setIsLoading(true)
            const { success, data } = await UsersAPI.onlinePlayers()
            
            if (success)
                setOnlinePlayers(data.players)

            setIsLoading(false)
        }

        fetchOnlinePlayers()
    }, []);

    return { onlinePlayers, isLoading }
};