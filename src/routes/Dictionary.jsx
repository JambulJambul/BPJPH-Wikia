/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import articles from '../data/articles.json'
import { ArticleCard, Loader, Pagination } from '../components'

const Dictionary = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const articlesPerPage = 4

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false) // Set loading state to false when data is ready
    }, 3000)
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastArticle = currentPage * articlesPerPage

  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage

  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="flex flex-col w-full h-full p-4 justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex w-full justify-center items-center p-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by Title"
              className="max-w-full sm:w-96 p-3 my-8 ml-3 sm:ml-6 rounded-md transition-width duration-300"
            />
          </div>
          <div className="flex flex-col gap-4">
            {currentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            articlesPerPage={articlesPerPage}
            totalArticles={filteredArticles.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  )
}

export default Dictionary
