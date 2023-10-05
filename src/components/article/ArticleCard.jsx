/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ArticleCard = ({ article }) => {

    const { id, title, content, references, img } = article

    const cardVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 2.0,
          ease: "easeOut",
        },
      },
    }
  
    return (
      <>
        <Link to={`/article/${id}`}>
          <AnimatePresence>
            <motion.div
              className="max-w-full mx-auto p-4 bg-white shadow-md rounded-md mb-4 "
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <h2 className="text-3xl font-bold mb-2 tracking-wider font-['Poppins']">
                {title}
              </h2>
              <p className="text-gray-700 pt-6">
                <span className="text-gray-800 font-semibold mb-4"> Definisi: </span>
                <br />
                {`${content.substring(0, 100)}...`}
              </p>
              {img && (
                <div className="mt-4 flex items-center">
                  <img
                    src={img}
                    alt={`Publisher : ${references}`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-600 font-medium">
                    {`${references.substring(0, 50)}...`}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Link>
      </>
    )
}

export default ArticleCard
