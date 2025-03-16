import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

import { useUserProfile } from "../../hooks/useUserProfile";
import { usePracticeLobby } from "../../hooks/usePracticeLobby";

function Practice() {

    const { userInfo, isLoading: isUserLoading } = useUserProfile()
    const { lobby, isLoading: isLobbyLoading } = usePracticeLobby(isUserLoading, userInfo)

    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            {(!isUserLoading && !isLobbyLoading && lobby) && 
                <Race mode={'Practice'} lobby={lobby} />
            }
        </div>
    );
}

export default Practice;