import React, { createContext, useContext } from 'react';

const AppContext = createContext()

const AppProvider = ({ children }) => {

    return (
        <AppContext.Provider value={{ }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext }