import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!Cookies.get("type-racer-header-payload")

        // Implement token verification endpoint
        // Token could be expired or invalid
    });

    const authenticate = () => setIsAuthenticated(true);

    const logout = () => {
        // Cookies.remove("type-racer-header-payload")
        // Cookies.remove("type-racer-signature")

        // Should call logout API endpoint
        // Remove cookies from the backend side

        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
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