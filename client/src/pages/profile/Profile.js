import Alert from "../../components/Alerts/Alert";
import Header from "../../components/Header/Header";
import ProfileActions from "../../features/profile/ProfileActions";
import ProfileInfo from "../../features/profile/ProfileInfo";

import { useAlert } from '../../hooks/useAlert';
import { useAPIHandler } from '../../hooks/useAPIHandler'
import { useUserProfile } from "../../hooks/useUserProfile";

const Profile = () => {

    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()
    const { handleLogout, handlePasswordChange } = useAPIHandler()
    const { userInfo, isLoading } = useUserProfile()

    const onLogout = async (e) => {
        e.preventDefault()
        handleLogout(showAlert)
    }
    
    const onPasswordChange = async (e) => {
        e.preventDefault()
        handlePasswordChange('', '', showAlert)
    }

    return (
        <div className="flex flex-col items-center gap-y-8 px-10 py-7">
            <Header />
            {isActive &&
                <Alert text={alertText} type={alertType} onDismissAlert={() => dismissAlert()} />
            }
            <div>
                {!isLoading && <ProfileInfo userInfo={userInfo} />}
                <ProfileActions onLogout={onLogout} onPasswordChange={onPasswordChange} />
            </div>
        </div>
    )
}

export default Profile;