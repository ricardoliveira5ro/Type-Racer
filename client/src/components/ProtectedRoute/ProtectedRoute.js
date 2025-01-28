import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { UsersAPI } from "../../api/usersAPI";

export const ProtectedRoute = () => {
    const [isAuthorized, setIsAuthorized] = useState();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { success } = await UsersAPI.verifyToken();
                setIsAuthorized(success);
            } catch (error) {
                setIsAuthorized(false);
            }
        };

        verifyToken();
    }, []);

    if (isAuthorized === undefined) {
        return null;
    }

    return isAuthorized ? <Outlet /> : <Navigate to={"/auth"} replace />
};