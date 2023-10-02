// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import articlesData from '../../articles.json' // Updated import path
import { Loader } from '../components'

const Article = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false) // Set loading state to false when data is ready
    }, 1500)
  }, [])

  // Find the article with the matching ID from the imported JSON data
  const article = articlesData.articles.find(
    (article) => article.id === parseInt(id, 10)
  )

  if (!article) {
    return <div>Article not found.</div>
  }

  const { title, content, reference, img } = article

  return (
    <div className="flex flex-col w-full h-full p-4 justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <motion.div
            className="w-full p-6 mx-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                className="text-4xl font-bold tracking-wider font-['Ysabeau Office']"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 2.0 }}
              >
                {title}
              </motion.h2>
              <Link to="/" className="text-2xl text-blue-500 hover:underline">
                Go Back
              </Link>
            </div>
            {img && (
              <motion.div
                className="flex items-center my-8"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 2.0 }}
              >
                <img
                  src={img}
                  alt={`References ${reference}`}
                  className="w-8 h-8 rounded-full mr-4"
                />
                <h1 className="text-gray-600 font-medium">
                  Admin
                </h1>
              </motion.div>
            )}
            <motion.div
              className="w-full my-8 tracking-wider"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 3.0 }}
            >
              <h2 className="text-xl text-gray-800 mb-4 font-semibold">
                Definisi
              </h2>
              <hr />
              <p className="text-gray-600">
                <br />
                {content}
                <br />
              </p>
            </motion.div>
            <motion.div
              className="w-full my-8 tracking-wider"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 4.0 }}
            >
              <h2 className="text-xl text-gray-800 mb-4 font-semibold">
                Referensi
              </h2>
              <hr />
              <p className="text-gray-600">
                <br />
                {reference}
                <br />
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default Article
