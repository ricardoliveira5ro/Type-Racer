import { useState } from "react";
import { validatePassword } from '../utils/validators';

export const usePasswordChange = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    
    const [isActive, setIsActive] = useState(false)
    
    //oldPassword, newPassword, confirmationPassword, 
    const handlePasswordChange = async (e, showAlert) => {
        e.preventDefault()

        console.log(oldPassword)
        console.log(newPassword)
        console.log(confirmationPassword)

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

        // Implement API call to check current password and update mechanism
        showAlert('SUCCESS', 'Password changed successfully')
    }

    return { setOldPassword, setNewPassword, setConfirmationPassword, isActive, setIsActive, handlePasswordChange }
};