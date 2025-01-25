import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersAPI } from "../api/usersAPI";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        // Reset value
        sessionStorage.removeItem("type-racer-user-session-token");

        const { success, data } = await UsersAPI.login({ username: '', email: email, password: password });

        if (success) {
            sessionStorage.setItem("type-racer-user-session-token", data.token)
            setIsAuthenticated(true);
            navigate('/home')

            return
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}