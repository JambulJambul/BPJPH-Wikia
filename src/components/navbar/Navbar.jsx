// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <div className="fixed w-screen z-50 flex justify-start px-4 py-1 bg-gradient-to-r from-15% from-blue-900 to-blue-500 drop-shadow-2xl">
            <div className="my-2">
              <Link to="/">
                <img src='/bpjph-logo.png' alt='BPJPH' className="h-12 max-w-full m-auto" />
              </Link>
            </div>
        </div>
    </>
  )
}

export default Navbar
