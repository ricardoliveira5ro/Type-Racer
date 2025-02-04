import { useNavigate } from 'react-router-dom';
import { UsersAPI } from '../api/usersAPI';

export const useLogout = () => {

    const navigate = useNavigate()

    const handleLogout = async (e, showAlert) => {
        e.preventDefault()

        const { success } = await UsersAPI.logout()

        if (success) {
            navigate('/home')
            return
        }
        
        showAlert('ERROR', 'Unable to logout')
    }

    return { handleLogout }
};