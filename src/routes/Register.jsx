/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Register = ({ setPage }) => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        email,
        password
      });
      console.log('Registration successful:', response.data);
      // Perform actions after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure
    }
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2>
        Register
      </h2>
      <div className="form-group">
        <label>
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>
        Register
      </button>
      <p onClick={() => setPage('login')} className="switch-page">
        Already have an account? Login
      </p>
    </motion.div>
  );
};

export default Register;
