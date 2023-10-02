// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <div className="grid w-full justify-center items-center py-5 bg-blue-900">
            <div className="my-2">
              <Link to="/">
                <img src='/bpjph-logo.png' alt='BPJPH' className="max-w-full m-auto" />
              </Link>
            </div>
        </div>
    </>
  )
}

export default Navbar
