import { useState } from "react";
import { validatePassword } from '../utils/validators';
import { UsersAPI } from "../api/usersAPI";

export const usePasswordChange = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    
    const [isActive, setIsActive] = useState(false)
    
    const handlePasswordChange = async (e, showAlert) => {
        e.preventDefault()

        const newPasswordValidation = validatePassword(newPassword)
        const confirmationPasswordValidation = validatePassword(confirmationPassword)

        if (!oldPassword.trim() || !newPassword.trim() || !confirmationPassword.trim()) {
            showAlert('ERROR', `All fields are required`)
            return;
        }

        if (newPassword !== confirmationPassword) {
            showAlert('ERROR', `Passwords do not match`)
            return;
        }

        if (!newPasswordValidation.isValid || !confirmationPasswordValidation.isValid) {
            const validationError = newPasswordValidation.error !== '' ? newPasswordValidation.error : confirmationPasswordValidation.error
            showAlert('ERROR', `Password ${validationError}`)
            return;
        }

        const { success, error } = await UsersAPI.changePassword({ oldPassword, newPassword })

        if (!success) {
            if (error.response?.status === 401) {
                showAlert('ERROR', 'Old password incorrect')
                return;
            }

            // General Error
            showAlert();
            return;
        }

        showAlert('SUCCESS', 'Password changed successfully')

        // Clear inputs and hide form
        setOldPassword('')
        setNewPassword('')
        setConfirmationPassword('')
        setIsActive(false);
    }

    return { setOldPassword, setNewPassword, setConfirmationPassword, isActive, setIsActive, handlePasswordChange }
};