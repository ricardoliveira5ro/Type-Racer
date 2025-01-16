import React from 'react';

const Overlay = ({ onSignUpClick, onSignInClick }) => (
    <div className="overlay-container">
        <div className="overlay">
            <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={onSignInClick}>Log In</button>
            </div>
            <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={onSignUpClick}>Sign Up</button>
            </div>
        </div>
    </div>
);

export default Overlay;