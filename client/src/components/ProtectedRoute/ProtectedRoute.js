import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const ProtectedRoute = () => {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={"/auth"} replace />
};