import React, { createContext, useContext, useEffect, useState } from 'react';
import quotes_data from '../assets/texts/texts.json'

const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        setQuotes(quotes_data)
    }, [])

    return (
        <AppContext.Provider value={{ quotes }}>
            {children}
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext }

// Usage in component
// import { useAppContext } from "../../context/AppContext"; 
// const { quotes } = useAppContext()