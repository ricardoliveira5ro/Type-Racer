import { useState } from "react"

import { useUserProfile } from "../../hooks/useUserProfile"
import { useAlert } from "../../hooks/useAlert"

import Header from "../../components/Header/Header"
import Alert from "../../components/Alerts/Alert"
import CustomJoinLobby from "../../features/custom/JoinLobby"
import CustomLobby from "../../features/custom/Lobby"

import { LobbyAPI } from "../../api/lobbyAPI"

function Custom ({ socket }) {

    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()
    const { userInfo } = useUserProfile()
    
    const [lobby, setLobby] = useState(null)

    const loadLobby = async (create, code) => {
        const params = { create, code }
        const isGuest = userInfo ? false : true

        const { success, data, error } = await LobbyAPI.custom(socket.id, params, isGuest)

        if (success)
            setLobby(data.lobby)
        else
            showAlert('ERROR', error.response.data.message)
    }

    return (
        <div className="flex flex-col items-center gap-y-12 px-10 py-7">
            <Header />
            {isActive &&
                <Alert text={alertText} type={alertType} onDismissAlert={() => dismissAlert()} />
            }
            {!lobby && <CustomJoinLobby loadLobby={loadLobby} />}
            {lobby && <CustomLobby socket={socket} lobby={lobby} />}
        </div>
    )
}

export default Custom