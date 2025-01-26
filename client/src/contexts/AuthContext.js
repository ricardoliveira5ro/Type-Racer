import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !!sessionStorage.getItem("type-racer-user-session-token")
    });

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