import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

import { useUserProfile } from "../../hooks/useUserProfile";
import { useFindLobby } from "../../hooks/useFindLobby";

function Multiplayer({ socket }) {

    const { userInfo, isLoading: isUserLoading } = useUserProfile()
    const { lobby, isLoading: isLobbyLoading } = useFindLobby(isUserLoading, userInfo, socket)

    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            {(!isUserLoading && !isLobbyLoading && lobby) && 
                <Race socket={socket} mode={'Multiplayer'} initialLobby={lobby} />
            }
        </div>
    );
}

export default Multiplayer;