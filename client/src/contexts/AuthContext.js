import React, { createContext, useContext, useEffect, useState } from "react";
import { UsersAPI } from "../api/usersAPI";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { success } = await UsersAPI.verifyToken();
                setIsAuthenticated(success);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []);

    const authenticate = () => setIsAuthenticated(true);

    return (
        <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
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