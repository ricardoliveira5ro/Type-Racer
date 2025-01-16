import './Authentication.css';

import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";
import { MoveLeft } from 'lucide-react';

import { useAuthentication } from '../hooks/useAuthentication';
import { validateField, validateEmail } from '../utils/validators';

import SignUpForm from '../features/authentication/SignUpForm';
import SignInForm from '../features/authentication/SignInForm';
import Overlay from '../features/authentication/Overlay';

const Authentication = () => {
    const { formData, errors, handleInputChange, clearInputs, setError } = useAuthentication();

    const containerRef = useRef(null);
    const signUpButtonRef = useRef(null);
    const signInButtonRef = useRef(null);

    const onSignUpSubmit = (e) => {
        e.preventDefault();

        const usernameValidation = validateField(formData.username);
        const emailValidation = validateEmail(formData.email);
        const passwordValidation = validateField(formData.password);

        setError('username', usernameValidation.error);
        setError('email', emailValidation.error);
        setError('password', passwordValidation.error);

        if (usernameValidation.isValid && emailValidation.isValid && passwordValidation.isValid) {
            axios.post("http://localhost:5000/api/users/signup", formData)
                .then((response) => {
                    console.log('User registered:', response.data);
                })
                .catch((error) => {
                    if (error.response?.status === 400 && error.response.data.message) {
                        const errorMessage = error.response.data.message;
                        if (errorMessage.endsWith('already exists')) {
                            if (errorMessage.includes("'username'")) {
                                setError('username', 'Already taken');
                            }
                            if (errorMessage.includes("'email'")) {
                                setError('email', 'Already taken');
                            }
                        }
                    }
                });
        }
    };

    useEffect(() => {
        const signUpButton = signUpButtonRef.current;
        const signInButton = signInButtonRef.current;
        const container = containerRef.current;

        if (signUpButton && signInButton && container) {
            const handleSignUpClick = () => {
                container.classList.add("right-panel-active");
                clearInputs();
            };
            const handleSignInClick = () => {
                container.classList.remove("right-panel-active");
                clearInputs();
            };

            signUpButton.addEventListener('click', handleSignUpClick);
            signInButton.addEventListener('click', handleSignInClick);

            return () => {
                signUpButton.removeEventListener('click', handleSignUpClick);
                signInButton.removeEventListener('click', handleSignInClick);
            };
        }
    }, [clearInputs]);

    return (
        <div className="flex flex-col justify-center items-center h-[100vh] px-8 py-5 gap-y-8">
            <div className="container" id="container" ref={containerRef}>
                <div className="form-container sign-up-container">
                    <SignUpForm
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        onSubmit={onSignUpSubmit}
                    />
                </div>
                <div className="form-container sign-in-container">
                    <SignInForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                </div>
                <Overlay
                    onSignUpClick={() => containerRef.current.classList.add("right-panel-active")}
                    onSignInClick={() => containerRef.current.classList.remove("right-panel-active")}
                />
            </div>
            <Link to={'/home'} className="flex gap-x-4">
                <MoveLeft color="white" />
                <span className="text-white">Go Back Home</span>
            </Link>
        </div>
    );
};

export default Authentication;