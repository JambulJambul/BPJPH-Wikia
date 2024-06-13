// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}users/register`, {
        email,
        password
      });
      console.log('Registration successful:', response.data);
      alert('Registration successful! You can now log in.');
      setEmail('');
      setPassword('');
    } catch (error) {
      handleRegistrationFailure(error);
    }
  };

  const handleRegistrationFailure = (error) => {
    console.error('Registration failed:', error);
    if (error.response && error.response.data && error.response.data.message) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('Registration failed. Please try again.');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">
          Register Admin
        </h2>
        <form className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
          </div>
          { errorMessage && <p className="text-red-500"> {errorMessage} </p> }
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleRegister}
              className="btn-primary text-blue-500"
            >
              Register
            </button>
            <Link to="/" className="btn-secondary text-red-500">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
