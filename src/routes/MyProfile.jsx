// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import profiles from '../data/profiles.json'
import { Loader,  Profile } from '../components'

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
        {profiles.map((profile) => (
          <Profile key={profile.id} profile={profile} />
        ))}
        </>
      )}
    </>
  )
}

export default MyProfile