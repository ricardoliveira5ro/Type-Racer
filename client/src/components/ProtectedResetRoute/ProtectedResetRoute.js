import { useEffect, useState } from "react";
import { Navigate, Outlet, useSearchParams } from 'react-router-dom'
import { UsersAPI } from "../../api/usersAPI";

export const ProtectedResetRoute = () => {
    const [searchParams] = useSearchParams()
    const [isAuthorized, setIsAuthorized] = useState()

    useEffect(() => {
        const verifyResetToken = async () => {
            try {
                const params = { 
                    user: searchParams.get('user'), 
                    reset_token: searchParams.get('reset_token') 
                }
                
                const { success } = await UsersAPI.verifyResetToken(params)
                setIsAuthorized(success);
            } catch (error) {
                setIsAuthorized(false);
            }
        };

        verifyResetToken();
    }, []);

    if (isAuthorized === undefined) {
        return null;
    }

    return isAuthorized ? <Outlet /> : <Navigate to={"/home"} replace />
}