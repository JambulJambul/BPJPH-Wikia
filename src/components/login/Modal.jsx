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
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-40"></div>
            <div className="bg-white rounded-lg p-6 z-50">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 ml-2"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
    </>
  )
}

export default Modal
