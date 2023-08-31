// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import articles from '../data/articles.json'
import { Loader } from '../components'

const Article = () => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false) // Set loading state to false when data is ready
    }, 1500)
  }, [])

  const { id } = useParams()

  const article = articles.find((article) => article.id === parseInt(id, 10))

  if (!article) {
    return <div> Article not found. </div>;
  }

  const { title, content, reference, img } = article

  return (
    <div className="flex flex-col w-full h-full p-4 justify-center items-center bg-gray-100">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid absolute top-0 left-0 w-full justify-center items-center py-5 bg-blue-900">
            <img src='/bpjph-logo.png' alt='BPJPH' className="w-80 m-auto" />
            <div className="justify-between text-center mt-8 mb-4 space-x-8">
              <Link to="/login" className="text-gray-100"> Logout </Link>
              <Link to="/" className="text-gray-100"> Dashboard </Link>
              <Link to="/my-profile" className="text-gray-100"> My Profile </Link>
            </div>
          </div>
          <div className="max-w-full p-6 bg-white shadow-md rounded-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-bold tracking-wider font-['Ysabeau Office']">
                {title}
              </h2>
              <Link to="/" className="text-2xl text-blue-500 hover:underline">
                Go Back
              </Link>
            </div>
            {img && (
              <div className="flex items-center my-8">
                <img
                  src={img}
                  alt={`References ${reference}`}
                  className="w-8 h-8 rounded-full mr-4"
                />
                <h1 className="text-gray-600 font-medium">
                  Admin
                </h1>
              </div>
            )}
            <div className="w-full my-8 tracking-wider">
              <h2 className="text-xl text-gray-800 mb-4 font-semibold">
                Definisi
              </h2>
              <hr />
              <p className="text-gray-600 text-2xl">
                <br />
                {content}
                <br />
              </p>
            </div>
            <div className="w-full my-8 tracking-wider">
              <h2 className="text-xl text-gray-800 mb-4 font-semibold">
                Referensi
              </h2>
              <hr />
              <p className="text-gray-600">
                <br />
                {reference}
                <br />
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Article
