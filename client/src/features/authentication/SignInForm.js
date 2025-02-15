import React from 'react';

const SignInForm = ({ formData, errors, handleInputChange, onSubmit, onPasswordRecovery }) => (
    <form onSubmit={onSubmit}>
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
            className={errors.email ? 'invalid-input' : ''}
        />
        <span className="w-full text-left text-red-600">{errors.email}</span>
        <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
            className={errors.password ? 'invalid-input' : ''}
        />
        <span className="w-full text-left text-red-600">{errors.password}</span>
        <a href='#' onClick={() => onPasswordRecovery()}>Forgot your password?</a>
        <button type="submit">Log In</button>
    </form>
);

export default SignInForm;