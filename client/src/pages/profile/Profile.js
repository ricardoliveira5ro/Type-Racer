import Alert from "../../components/Alerts/Alert";
import Header from "../../components/Header/Header";
import ProfileActions from "../../features/profile/ProfileActions";
import ProfileChangePassword from "../../features/profile/ProfileChangePassword";
import ProfileInfo from "../../features/profile/ProfileInfo";

import { useAlert } from '../../hooks/useAlert';
import { useLogout } from "../../hooks/useLogout";
import { usePasswordChange } from "../../hooks/usePasswordChange";
import { useUserProfile } from "../../hooks/useUserProfile";

const Profile = () => {

    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()
    const { setOldPassword, setNewPassword, setConfirmationPassword, isActive: isPasswordContainerActive, setIsActive: setIsPasswordContainerActive, handlePasswordChange } = usePasswordChange()
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
                <ProfileActions onLogout={(e) => handleLogout(e, showAlert)} onPasswordChange={() => setIsPasswordContainerActive(!isPasswordContainerActive)} />
                {isPasswordContainerActive && <ProfileChangePassword setOldPassword={setOldPassword} setNewPassword={setNewPassword} setConfirmationPassword={setConfirmationPassword} onSubmit={(e) => handlePasswordChange(e, showAlert)} />}
            </div>
        </div>
    )
}

export default Profile;