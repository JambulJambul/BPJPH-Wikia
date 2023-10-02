/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

const Modal = ({ isOpen, onClose }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleLogin = () => {
      // Add your login logic here
      // For simplicity, we'll just alert the entered email and password
      alert(`Email: ${email}\nPassword: ${password}`)

      onClose()
    }
  
    return (
      <>
        {isOpen && (
          <div className="fixed w-full h-full inset-0 p-6 flex items-center justify-center z-50 font-['Poppins']">
            <div className="fixed inset-0 bg-black opacity-40"></div>
            <div className="bg-gray-100 rounded-lg p-12 z-50">
              <h2 className="text-2xl text-center font-bold tracking-widest mb-8">
                Admin Login
              </h2>
              <div className="text-sm mb-4 font-light">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-sm mb-4 font-light">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex w-full justify-center items-center space-x-5 mt-8">
                <button
                    className="bg-blue-500 text-gray-100 rounded-lg px-4 py-2 hover:bg-blue-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <button
                    className="bg-gray-500 rounded-lg px-4 py-2 text-gray-100 hover:bg-gray-700 ml-2"
                    onClick={onClose}
                >
                    Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Modal
