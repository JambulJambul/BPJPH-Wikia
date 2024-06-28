import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import encryptPayload from '../../routes/utils/encryption';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = { email, password }
      const encryptedData = encryptPayload(data)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { encryptedData });
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
      const data = { email, password, username }
      const encryptedData = encryptPayload(data)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, { encryptedData });
      console.log('Registration successful:', response.data);
      alert('Registration successful! You can now log in.');
      setEmail('');
      setPassword('');
      setUsername('');
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

  const switchLoginRegister = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setIsLoginMode(!isLoginMode)
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
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
            <div className="fixed inset-0 bg-black opacity-40" onClick={handleOverlayClick}></div>
            <motion.div
              className="flex flex-1 flex-col justify-center space-y-5 bg-gray-100 p-12 rounded-md max-w-md z-50"
              initial={{ scale: 0.5, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -100 }}
            >
              <div className="flex flex-col my-4 text-center">
                <h2 className="text-xl md:text-3xl font-bold tracking-widest">
                  {isLoginMode ? 'Login' : 'Register'}
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
                {!isLoginMode && (
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
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
              </form>
              <motion.button
                className="text-gray-500 hover:text-gray-700 font-medium transition-all duration-300"
                onClick={onClose}
              >
                Close
              </motion.button>
              <div className="text-center">
                <button
                  onClick={switchLoginRegister}
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
