import { useState } from 'react';

export const useAlert = () => {
    const [isActive, setIsActive] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertText, setAlertText] = useState('');

    const showAlert = (type = 'ERROR', message = 'Something went wrong!') => {
        setAlertType(type)
        setAlertText(message)
        setIsActive(true)
    }

    const dismissAlert = () => {
        setIsActive(false)
    }

    return { isActive, alertType, alertText, showAlert, dismissAlert }
}