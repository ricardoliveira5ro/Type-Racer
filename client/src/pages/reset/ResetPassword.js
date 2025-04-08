import { useEffect } from "react";

import Alert from "../../components/Alerts/Alert";
import ResetForm from "../../features/reset/ResetForm";

import { useAlert } from '../../hooks/useAlert';
import { usePasswordReset } from '../../hooks/usePasswordReset'

const ResetPassword = () => {

    useEffect(() => {
        document.title = 'Reset Password';
    }, []);

    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()
    const { setNewPassword, setConfirmationPassword, handlePasswordReset } = usePasswordReset()

    return (
        <div className="flex flex-col justify-center items-center min-h-[100vh] px-8 py-5 gap-y-8">
            {isActive &&
                <Alert text={alertText} type={alertType} onDismissAlert={() => dismissAlert()} />
            }
            <ResetForm setNewPassword={setNewPassword} setConfirmationPassword={setConfirmationPassword} onSubmit={(e) => handlePasswordReset(e, showAlert)} />
        </div>
    )
}

export default ResetPassword;