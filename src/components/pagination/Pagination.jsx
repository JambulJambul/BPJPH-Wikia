/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

const Pagination = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
    
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <nav className="mt-8 mb-12">
        <ul className="flex space-x-3">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 ${
                  currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Pagination
