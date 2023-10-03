// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import profiles from '../data/profiles.json'
import { Loader,  Profile } from '../components'
import { Link } from 'react-router-dom'

const MyProfile = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <div className="grid w-full justify-center items-center py-5 bg-blue-900">
            <div className="justify-between text-center mt-8 mb-4 space-x-8">
              <Link to="/">
                <img src='/bpjph-logo.png' alt='BPJPH' className="w-80 m-auto" />
              </Link>
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