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

export const validatePassword = (value) => {
    if (!value.trim()) 
        return { error: 'Required field', isValid: false };
    if (!validator.isStrongPassword(value, { minLength: 7, minUppercase: 1, minSymbols: 1 })) 
        return { error: 'Requirements: Min length 7, 1 uppercase letter, 1 number', isValid: false };

    return { error: '', isValid: true };
}