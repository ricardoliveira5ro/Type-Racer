import { useNavigate } from "react-router-dom";
import { UsersAPI } from "../api/usersAPI";

export const useAuthentication = () => {

    const navigate = useNavigate()

    const handleLoginSubmit = async (formData, clearInputs, showAlert) => {
        const { success } = await UsersAPI.login(formData);

        if (success) {
            navigate('/profile')
            clearInputs()

            return;
        }

        showAlert('ERROR', 'Unable to login')
    }

    const handleSignupSubmit = async (formData, clearInputs, showAlert, containerRef, setError) => {
        const { success, error } = await UsersAPI.signup(formData)

        if (success) {
            containerRef.current.classList.remove("right-panel-active");
            clearInputs()

            showAlert('SUCCESS', 'Your account has been created successfully')

        } else {
            if (error.response?.status === 400 && error.response.data.message && error.response.data.message.endsWith('already exists')) {
                if (error.response.data.message.includes("'username'")) {
                    setError('username', 'Already taken');
                }
                if (error.response.data.message.includes("'email'")) {
                    setError('email', 'Already taken');
                }

                return;
            }

            // General Error
            showAlert();
        }
    }

    return { handleLoginSubmit, handleSignupSubmit }
}