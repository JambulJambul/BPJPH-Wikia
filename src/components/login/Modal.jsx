/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email,
        password,
      });
      const token = response?.data?.token;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const { role } = decodedToken;
      pushPage(role);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        email,
        password
      });
      console.log('Registration successful:', response.data);
      alert('Registration successful! You can now log in.');
      setEmail('');
      setPassword('');
      setIsLoginMode(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const pushPage = (role) => {
    if (role === '1') {
      navigate('/admin');
    } else {
      navigate('/my-profile');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 bg-black opacity-40"></div>
            <motion.div
              className="flex flex-1 flex-col justify-center space-y-5 bg-gray-100 p-12 rounded-md max-w-md z-50"
              initial={{ scale: 0.5, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -100 }}
            >
              <div className="flex flex-col my-4 text-center">
                <h2 className="text-xl md:text-3xl font-bold tracking-widest">
                  {isLoginMode ? 'Admin Login' : 'Register Admin'}
                </h2>
              </div>
              <form className="flex flex-col max-w-md space-y-5" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-1 rounded-lg font-medium bg-blue-600 text-gray-100 transition-all duration-300 hover:bg-blue-700 hover:text-white"
                >
                  {isLoginMode ? 'Login' : 'Register'}
                </button>
                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}
                <div className="flex justify-center items-center">
                  <span className="w-full border border-black"></span>
                  <span className="px-4">Or</span>
                  <span className="w-full border border-black"></span>
                </div>
                <motion.button
                  className="text-gray-500 hover:text-gray-700 ml-2 font-medium transition-all duration-300"
                  onClick={onClose}
                >
                  Close
                </motion.button>
              </form>
              <div className="text-center">
                <button 
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="text-blue-600 hover:underline"
                >
                  {isLoginMode ? 'Register' : 'Login'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AuthModal;
