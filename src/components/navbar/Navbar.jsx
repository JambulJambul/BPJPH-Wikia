// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from '..'
import useAuth from '../../routes/utils/useAuth';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);
  const [usernameDisplay, setusernameDisplay] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, isAdmin, isLoading, userData, refreshAuthState } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setAuthStatus(isAdmin ? 'admin' : 'user');
        setusernameDisplay(userData?.username)
      } else {
        setAuthStatus('guest');
      }
    }
  }, [isAuthenticated, isAdmin, isLoading]);

  const openLoginModal = () => {
    setModalOpen(true);
  };

  const closeLoginModal = () => {
    setModalOpen(false);
    setDropdownOpen(false)
    refreshAuthState();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toDashboard = () => {
    if (authStatus === 'admin') {
      navigate("/admin")
    } else {
      navigate("/my-profile")
    }
    setDropdownOpen(false)
  }

  const toHome = () => {
    navigate('/')
    setDropdownOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
    setAuthStatus(null)
    setDropdownOpen(false)
    refreshAuthState();
  }

  return (
    <>
      <div className="fixed w-screen z-50 flex justify-between px-10 py-1 bg-gradient-to-r from-15% from-blue-900 to-blue-500 drop-shadow-2xl items-center">
        <div onClick={toHome} className="my-2 cursor-pointer">
          <img src='/bpjph-logo.png' alt='BPJPH' className="h-12 max-w-full m-auto" />
        </div>
        {
          isLoading ? (
            <div className='text-white'>Loading...</div>
          ) : (
            authStatus === 'admin' ? (<>
              <div onClick={toggleDropdown} className='cursor-pointer flex items-center'>
                <h4 className='text-white mr-2'>Hi, {usernameDisplay}</h4>
                <FaUserCircle className='text-white' size={36} />
              </div>
              {dropdownOpen && (
                <div className="absolute right-10 top-14 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <button onClick={toDashboard} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Sign Out
                  </button>
                </div>
              )}
            </>
            ) : authStatus === 'user' ? (<>
              <div onClick={toggleDropdown} className='cursor-pointer flex items-center'>
                <h4 className='text-white mr-2'>Hi, {usernameDisplay}</h4>
                <FaUserCircle className='text-white' size={36} />
              </div>
              {dropdownOpen && (
                <div className="absolute right-10 top-14 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <button onClick={toDashboard} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Sign Out
                  </button>
                </div>
              )}
            </>
            ) : (
              <div onClick={openLoginModal} className='cursor-pointer bg-white py-2 px-4 rounded-md'>
                <h4 className='text-blue-500'>Login</h4>
              </div>
            )
          )
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Navbar;
