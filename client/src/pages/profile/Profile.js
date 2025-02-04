import Alert from "../../components/Alerts/Alert";
import Header from "../../components/Header/Header";
import ProfileActions from "../../features/profile/ProfileActions";
import ProfileInfo from "../../features/profile/ProfileInfo";

import { useAlert } from '../../hooks/useAlert';
import { useLogout } from "../../hooks/useLogout";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import { useUserProfile } from "../../hooks/useUserProfile";

const Profile = () => {

    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()
    const { handleProfilePasswordChange } = usePasswordChange()
    const { handleLogout } = useLogout()
    const { userInfo, isLoading } = useUserProfile()

    return (
        <div className="flex flex-col items-center gap-y-8 px-10 py-7">
            <Header />
            {isActive &&
                <Alert text={alertText} type={alertType} onDismissAlert={() => dismissAlert()} />
            }
            <div>
                {!isLoading && <ProfileInfo userInfo={userInfo} />}
                <ProfileActions onLogout={(e) => handleLogout(e, showAlert)} onPasswordChange={(e) => handleProfilePasswordChange(e, showAlert, '', '')} />
            </div>
        </div>
    )
}

export default Profile;