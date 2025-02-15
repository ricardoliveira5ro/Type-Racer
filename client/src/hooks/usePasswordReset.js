import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { UsersAPI } from "../api/usersAPI";
import { validatePassword } from '../utils/validators';

export const usePasswordReset = () => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')
    
    const handlePasswordReset = async (e, showAlert) => {
        e.preventDefault()

        const newPasswordValidation = validatePassword(newPassword)
        const confirmationPasswordValidation = validatePassword(confirmationPassword)

        if (!newPassword.trim() || !confirmationPassword.trim()) {
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

        const params = { 
            user: searchParams.get('user'), 
            reset_token: searchParams.get('reset_token') 
        }

        const { success } = await UsersAPI.resetPassword(params, { password: newPassword })

        if (!success) {
            // General Error
            showAlert();
            return;
        }

        // Clear inputs
        setNewPassword('')
        setConfirmationPassword('')
        
        showAlert('SUCCESS', 'Password reset successfully')
        
        navigate('/auth')
    }

    return { setNewPassword, setConfirmationPassword, handlePasswordReset }
};