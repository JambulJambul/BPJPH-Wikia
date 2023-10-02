/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ArticleCard = ({ article }) => {

    const { id, title, content, reference, img } = article

    const cardVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 2.0, // Adjust the duration as needed
          ease: "easeOut", // Adjust the easing function as needed
        },
      },
    }
  
    return (
      <>
        <Link to={`/article/${id}`} className="w-full">
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
              <p className="text-gray-800 pt-6">
                <span className="font-semibold mb-4"> Definisi: </span>
                <br />
                {`${content.substring(0, 100)}...`}
              </p>
              {img && (
                <div className="mt-4 flex items-center">
                  <img
                    src={img}
                    alt={`Publisher : ${reference}`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-600 font-medium">
                    {`${reference.substring(0, 50)}...`}
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
