// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import profiles from '../data/profiles.json'
import { Loader,  Profile } from '../components'
import { Link } from 'react-router-dom'

const MyProfile = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false) // Set loading state to false when data is ready
    }, 1500)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid absolute top-0 left-0 w-full justify-center items-center py-5 bg-blue-900 font-['Poppins']">
            <img src='/bpjph-logo.png' alt='BPJPH' className="w-80 m-auto" />
            <div className="justify-between text-center mt-8 mb-4 space-x-8">
              <Link to="/login" className="text-gray-100"> Logout </Link>
              <Link to="/" className="text-gray-100"> Dashboard </Link>
              <Link to="/my-profile" className="text-gray-100"> My Profile </Link>
            </div>
          </div>
        {profiles.map((profile) => (
          <Profile key={profile.id} profile={profile} />
        ))}
        </>
      )}
    </>
  )
}

export default MyProfile