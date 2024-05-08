import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import UserContext from './UserContext';

const LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserId } = useContext(UserContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        // After successful login...
        // console.log(data._id)

        setUserId(data._id);
        alert('Login successful, redirecting to main schedule page...');
        navigate(`/schedule/${data._id}`); 
      } else {
        alert('Login failed');
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Orderly Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            </div>
            <button type="submit">Login</button>
        </form>
        <p>New to Orderly? Sign Up <Link to="/register">here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
