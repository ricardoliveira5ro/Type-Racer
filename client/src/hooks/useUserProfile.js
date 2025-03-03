import { useEffect, useState } from 'react';
import { UsersAPI } from '../api/usersAPI';

export const useUserProfile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true)
            const { success, data } = await UsersAPI.profile()

            if (success) {
                setUserInfo({
                    username: data.user.username,
                    email: data.user.email,
                    races: data.user.stats.races,
                    wins: data.user.stats.wins,
                    accuracy: data.user.stats.accuracy,
                    wpm: data.user.stats.wpm,
                    wpmLast10Races: data.user.stats.wpmLast10RacesAvg,
                    accuracyLast10Races: data.user.stats.accuracyLast10RacesAvg,
                    bestRaceWPM: data.user.stats.bestRaceWPM,
                    lastRaceWPM: data.user.stats.lastRaceWPM,
                })
            }
            setIsLoading(false)
        };

        fetchUser();
    }, []);

    return { userInfo, isLoading }
};