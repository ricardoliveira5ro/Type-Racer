import Header from "../../components/Header/Header"
import CustomJoinLobby from "../../features/custom/JoinLobby"

function Custom () {

    return (
        <div className="flex flex-col items-center gap-y-12 px-10 py-7">
            <Header />
            <CustomJoinLobby />
        </div>
    )
}

export default Custom