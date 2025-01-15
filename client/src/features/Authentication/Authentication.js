import './Authentication.css'

import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { MoveLeft } from 'lucide-react';
import validator from 'validator';

function Authentication() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clearInputs = () => {
        setUsername('')
        setEmail('')
        setPassword('')
    }
    
    const validateRequiredField = (input, errorElement) => {
        if (!input.value.trim()) {
            input.classList.add("invalid-input");
            errorElement.textContent = 'Required field';
            return false;

        } else {
            input.classList.remove("invalid-input");
            errorElement.textContent = '';
            return true;
        }
    };

    const validateEmail = (emailElement, errorElement) => {
        if (!emailElement.value.trim()) {
            emailElement.classList.add("invalid-input");
            errorElement.textContent = 'Required field';
            return false

        } else if (!validator.isEmail(emailElement.value)) {
            emailElement.classList.add("invalid-input");
            errorElement.textContent = 'Invalid Email';
            return false

        } else {
            emailElement.classList.remove("invalid-input");
            errorElement.textContent = '';
            return true;
        }
    }

    const onSignUpSubmit = (e) => {
        e.preventDefault()

        const usernameInput = document.getElementById('usernameSignUp');
        const usernameError = document.getElementById('usernameError');
        const emailInput = document.getElementById('emailSignUp');
        const emailError = document.getElementById('emailError');
        const passwordInput = document.getElementById('passwordSignUp');
        const passwordError = document.getElementById('passwordError');

        const isUsernameValid = validateRequiredField(usernameInput, usernameError);
        const isPasswordValid = validateRequiredField(passwordInput, passwordError);
        const isEmailValid = validateEmail(emailInput, emailError);
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            console.log('Form is valid');

            // API endpoint
        }
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
            clearInputs()
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
            clearInputs()
        });
    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-[100vh] px-8 py-5 gap-y-8'>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><img src={require('../../assets/images/google-icon.webp')} alt='Google icon' /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input id='usernameSignUp' value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                        <span id='usernameError' className='w-full text-left text-red-600'></span>
                        <input id='emailSignUp' value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <span id='emailError' className='w-full text-left text-red-600'></span>
                        <input id='passwordSignUp' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <span id='passwordError' className='w-full text-left text-red-600'></span>
                        <button onClick={e => onSignUpSubmit(e)} className='mt-3'>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><img src={require('../../assets/images/google-icon.webp')} alt='Google icon' /></a>
                        </div>
                        <span>or use your account</span>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Log In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn">Log In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <Link to={'/home'} className='flex gap-x-4'>
                <MoveLeft color='white' />
                <span className='text-white'>Go Back Home</span>
            </Link>
        </div>
    )
}

export default Authentication