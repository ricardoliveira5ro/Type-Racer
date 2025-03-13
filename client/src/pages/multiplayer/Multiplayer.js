import { useMemo } from "react";

import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

import { useUserProfile } from "../../hooks/useUserProfile";
import { useFindLobby } from "../../hooks/useFindLobby";

function Multiplayer({ socket }) {

    const { userInfo, isLoading: isUserLoading } = useUserProfile()
    const { lobby, isLoading: isLobbyLoading } = useFindLobby(isUserLoading, userInfo)

    const players = useMemo(() => {
        if (isUserLoading) return

        if (userInfo) return [userInfo]

        return [{ username: 'Guest' }]

    }, [isUserLoading, userInfo])

    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            {(!isUserLoading && players && !isLobbyLoading && lobby) && 
                <Race socket={socket} mode={'Multiplayer'} players={players} lobby={lobby} />
            }
        </div>
    );
}

export default Multiplayer;