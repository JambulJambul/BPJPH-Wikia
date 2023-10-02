/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const ArticleCard = ({ article }) => {

    const { id, title, content, reference, img } = article
  
    return (
      <>
        <Link to={`/article/${id}`} className="w-full">
          <div className="max-w-full mx-auto p-4 bg-white shadow-md rounded-md mb-4 ">
            <h2 className="text-4xl font-bold mb-2 tracking-wider font-['Poppins']">
              {title}
            </h2>
            <p className="text-gray-800 pt-6">
              <span className="font-semibold"> Definisi: </span>
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
          </div>
        </Link>
      </>
    )
}

export default ArticleCard
