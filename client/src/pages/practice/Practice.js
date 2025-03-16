import { useMemo } from "react";

import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

import { useUserProfile } from "../../hooks/useUserProfile";

function Practice() {

    const { userInfo, isLoading } = useUserProfile()

    const lobby = useMemo(() => {
        if (isLoading) return

        return {
            players: userInfo ? [{ playerName: userInfo.username }] : [{ playerName: 'Guest' }]
        }

    }, [isLoading, userInfo])

    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            {(!isLoading && lobby) && <Race mode={'Practice'} lobby={lobby} />}
        </div>
    );
}

export default Practice;