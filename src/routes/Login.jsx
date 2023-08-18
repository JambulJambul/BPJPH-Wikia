/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Loader, Modal } from '../components'

const Login = () => {

  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false) // Set loading state to false when data is ready
    }, 1500)
  }, [])

  return (
    <>
        <div className="max-w-[280px] mx-auto">
            {isLoading ? (
                <Loader />
            ) : (
                <>  
                    <Modal />
                </>
            )}
        </div>
    </>
  )
}

export default Login
