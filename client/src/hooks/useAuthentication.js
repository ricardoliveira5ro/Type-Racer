import { useState } from 'react';

export const useAuthentication = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const clearInputs = () => {
        setFormData({ username: '', email: '', password: '' });
        setErrors({});
    };

    const setError = (field, message) =>
        setErrors((prev) => ({ ...prev, [field]: message }));

    return { formData, errors, handleInputChange, clearInputs, setError };
};