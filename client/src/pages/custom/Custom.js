import { useState } from "react"

import { useUserProfile } from "../../hooks/useUserProfile"
import { useAlert } from "../../hooks/useAlert"
import { useCustomLobby } from "../../hooks/useCustomLobby"

import Header from "../../components/Header/Header"
import Alert from "../../components/Alerts/Alert"
import Race from "../../components/Race/Race"
import CustomJoinLobby from "../../features/custom/JoinLobby"

import { Copy } from "lucide-react"

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
            {(!isLobbyLoading && lobby) &&
                <>
                    <Race socket={socket} mode={'Custom'} initialLobby={lobby} isGuest={userInfo ? false : true} />
                    {(!lobby.startCountDown) &&
                        <div className="flex items-center w-full gap-x-6">
                            <div className='flex items-center gap-x-2 cursor-pointer' onClick={() => navigator.clipboard.writeText(lobby.code)}>
                                <p className="text-white">Code:</p>
                                <span className='text-[var(--green)] text-lg'>{lobby.code}</span>
                                <Copy color="white" />
                            </div>
                            {socket.id === lobby.players[0].user &&<button className='px-8 py-1.5 rounded-md bg-[var(--green)]'>Start Race</button>}
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Custom