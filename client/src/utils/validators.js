import validator from 'validator';

export const validateField = (value) => {
    const error = !value.trim() ? 'Required field' : '';

    return { error, isValid: !error };
};

export const validateEmail = (value) => {
    if (!value.trim()) 
        return { error: 'Required field', isValid: false };
    if (!validator.isEmail(value)) 
        return { error: 'Invalid email', isValid: false };

    return { error: '', isValid: true };
};