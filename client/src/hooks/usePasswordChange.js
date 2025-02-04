export const usePasswordChange = () => {

    const handleProfilePasswordChange = async (e, showAlert, oldPassword, newPassword) => {
        e.preventDefault()

        // To be implemented
        const success = true

        if (success) {
            showAlert('SUCCESS', 'Password changed successfully')
        }
    }

    return { handleProfilePasswordChange }
};