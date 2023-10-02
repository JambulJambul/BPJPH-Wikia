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
            <div className="flex flex-1 flex-col justify-center space-y-5 bg-gray-100 p-12 rounded-md max-w-md z-50">
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
                    <button
                        onClick={handleLogin}
                        className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-1 rounded-lg font-medium bg-blue-600 text-gray-100 transition-all duration-300 hover:bg-blue-700 hover:text-white"
                    >
                        Login
                    </button>
                    <div className="flex justify-center items-center">
                        <span className="w-full border border-black"></span>
                        <span className="px-4">
                            Or
                        </span>
                        <span className="w-full border border-black"></span>
                    </div>
                    <button
                        className="text-gray-500 hover:text-gray-700 ml-2 font-medium transition-all duration-300"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Modal
