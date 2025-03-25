import { useState } from "react"

import { useUserProfile } from "../../hooks/useUserProfile"
import { useAlert } from "../../hooks/useAlert"
import { useCustomLobby } from "../../hooks/useCustomLobby"

import Header from "../../components/Header/Header"
import Alert from "../../components/Alerts/Alert"
import Race from "../../components/Race/Race"
import CustomJoinLobby from "../../features/custom/JoinLobby"

function Custom ({ socket }) {

    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()
    const { userInfo, isLoading: isUserLoading } = useUserProfile()

    const [code, setCode] = useState(null)
    const [create, setCreate] = useState(null)

    const { isLoading: isLobbyLoading, lobby } = useCustomLobby(isUserLoading, userInfo, socket, create, code, showAlert)

    return (
        <div className="flex flex-col items-center gap-y-12 px-10 py-7">
            <Header />
            {isActive &&
                <Alert text={alertText} type={alertType} onDismissAlert={() => dismissAlert()} />
            }
            {!lobby && <CustomJoinLobby setCreate={setCreate} setCode={setCode} />}
            {(!isLobbyLoading && lobby) && <Race socket={socket} mode={'Custom'} initialLobby={lobby} isGuest={userInfo ? false : true} />}
        </div>
    )
}

export default Custom