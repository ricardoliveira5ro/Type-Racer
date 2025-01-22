import './Authentication.css';

import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";
import { MoveLeft } from 'lucide-react';

import { useFormAuthentication } from '../../hooks/useFormAuthentication';
import { useAlert } from '../../hooks/useAlert';
import { validateField, validateEmail } from '../../utils/validators';

import SignUpForm from '../../features/authentication/SignUpForm';
import SignInForm from '../../features/authentication/SignInForm';
import Overlay from '../../features/authentication/Overlay';
import Alert from '../../components/Alerts/Alert';

const Authentication = () => {

    const navigate = useNavigate();

    const { formData, errors, handleInputChange, clearInputs, setError } = useFormAuthentication();
    const { isActive, alertType, alertText, showAlert, dismissAlert } = useAlert()

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
                    showAlert('SUCCESS', 'Your account has been created successfully')

                    containerRef.current.classList.remove("right-panel-active");
                    clearInputs()
                })
                .catch((error) => {
                    if (error.response?.status === 400 && error.response.data.message && error.response.data.message.endsWith('already exists')) {
                        if (error.response.data.message.includes("'username'")) {
                            setError('username', 'Already taken');
                        }
                        if (error.response.data.message.includes("'email'")) {
                            setError('email', 'Already taken');
                        }

                    } else {
                        showAlert()

                        console.log(error)
                    }
                });
        }
    };

    const onLoginSubmit = (e) => {
        e.preventDefault();

        const emailValidation = validateField(formData.email);
        const passwordValidation = validateField(formData.password);

        setError('email', emailValidation.error);
        setError('password', passwordValidation.error);

        if (emailValidation.isValid && passwordValidation.isValid) {
            axios.post("http://localhost:5000/api/users/login", formData)
                .then((response) => {
                    console.log('Successfully logged in:', response.data);

                    navigate('/home')
                    clearInputs()
                })
                .catch((error) => {
                    showAlert('ERROR', 'Unable to login')

                    console.log(error)
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
            {isActive && 
                <Alert text={alertText} type={alertType} onDismissAlert={() => dismissAlert()} />
            }
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
                        errors={errors}
                        handleInputChange={handleInputChange}
                        onSubmit={onLoginSubmit}
                    />
                </div>
                <Overlay
                    onSignUpClick={() => {
                        clearInputs()
                        containerRef.current.classList.add("right-panel-active")
                    }}
                    onSignInClick={() => {
                        clearInputs()
                        containerRef.current.classList.remove("right-panel-active")
                    }}
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