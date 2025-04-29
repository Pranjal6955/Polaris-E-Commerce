import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css'; // Reusing the same CSS for now

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async () => {
        // Basic validation
        if (!name || !email || !password || !phone) {
            setError('Please fill all required fields');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const apiobj = {
            name: name,
            email: email,
            password: password,
            phone: phone
        }
        
        try {
            const response = await axios({
                method: 'POST',
                url: "https://polaris-ecomm-new.vercel.app/user/signup",
                data: apiobj
            });
            
            setSuccess('Sign up successful! You can now sign in.');
            console.log('Sign up successful:', response.data);
            // Clear form after successful signup
            setName('');
            setEmail('');
            setPassword('');
            setPhone('');
        } catch (err) {
            console.error('Sign up failed:', err);
            setError(err.response?.data?.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h2>Create Account</h2>
          <p>Sign up to get started with Polaris</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="signin-form">
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input 
              id="name"
              className="signin-input" 
              value={name} 
              type="text" 
              placeholder='Enter your username' 
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
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
            <input 
              id="password"
              className="signin-input"
              value={password} 
              type="password" 
              placeholder='Create a password'
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              id="phone"
              className="signin-input"
              value={phone} 
              type="tel" 
              placeholder='Enter your phone number'
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button 
            className="signin-button" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          
          <div className="signup-option">
            Already have an account? <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup