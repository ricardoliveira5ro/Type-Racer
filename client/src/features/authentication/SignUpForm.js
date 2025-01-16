import React from 'react';

const SignUpForm = ({ formData, errors, handleInputChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
            <a href="#" className="social">
                <img src={require('../../assets/images/google-icon.webp')} alt="Google icon" />
            </a>
        </div>
        <span>or use your email for registration</span>
        <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            className={errors.username ? 'invalid-input' : ''}
        />
        <span className="w-full text-left text-red-600">{errors.username}</span>
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
        <button type="submit" className="mt-3">Sign Up</button>
    </form>
);

export default SignUpForm;