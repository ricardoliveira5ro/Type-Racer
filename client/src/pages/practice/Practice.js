import { useMemo } from "react";

import Header from "../../components/Header/Header";
import Race from "../../components/Race/Race";

import { useUserProfile } from "../../hooks/useUserProfile";

function Practice() {

    const { userInfo, isLoading } = useUserProfile()

    const players = useMemo(() => {
        if (isLoading) return

        if (userInfo) return [userInfo]

        return [{ username: 'Guest' }]

    }, [isLoading, userInfo])

    return (
        <div className="flex flex-col px-10 py-7 gap-y-8">
            <Header />
            {(!isLoading && players) && <Race title={'Practice'} players={players} />}
        </div>
    );
}

export default Practice;