import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';
// Import icons from a library like react-icons (you'll need to install it)
// import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async () => {
        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const apiobj = {
            email: email,
            password: password
        }
        
        try {
            const response = await axios({
                method: 'POST',
                url: "https://polaris-ecomm-new.vercel.app/user/signin", // Corrected to https
                data: apiobj
            });
            
            setSuccess('Sign in successful!');
            console.log('Sign in successful:', response.data);
            // Handle successful login (e.g., store token, redirect)
        } catch (err) {
            console.error('Sign in failed:', err);
            setError(err.response?.data?.message || 'Sign in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="signin-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            {/* <FaEnvelope className="input-icon" /> */}
            <input 
              id="email"
              className="signin-input" 
              value={email} 
              type="email" 
              placeholder='Enter your email' 
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            {/* <FaLock className="input-icon" /> */}
            <input 
              id="password"
              className="signin-input"
              value={password} 
              type="password" 
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="signin-options">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button 
            className="signin-button" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <div className="signup-option">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin