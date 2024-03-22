/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const Modal = ({ isOpen, onClose }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Authentication failed:', error);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      onClose();
      history.push('/my-profile');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    history.push('/');
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
                  Admin Login
                </h2>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-light placeholder-font-normal"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-1 rounded-lg font-medium text-red-600 transition-all duration-300 hover:text-red-800"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-1 rounded-lg font-medium bg-blue-600 text-gray-100 transition-all duration-300 hover:bg-blue-700 hover:text-white"
                  >
                    Login
                  </button>
                )}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
