import React from 'react';

const SignInForm = ({ formData, handleInputChange }) => (
    <form>
        <h1>Sign in</h1>
        <div className="social-container">
            <a href="#" className="social">
                <img src={require('../../assets/images/google-icon.webp')} alt="Google icon" />
            </a>
        </div>
        <span>or use your account</span>
        <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Email"
        />
        <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
        />
        <a href="#">Forgot your password?</a>
        <button type="button">Log In</button>
    </form>
);

export default SignInForm;