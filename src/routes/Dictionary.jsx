/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import articlesData from '../../articles.json'
import { ArticleCard, Loader, Pagination } from '../components'

const Dictionary = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const articlesPerPage = 4

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const filteredArticles = articlesData.articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
    ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="flex flex-col w-full h-full p-4 justify-center items-center overflow-x-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex w-full justify-center items-center p-4">
            <div className="text-gray-600">
              <AiOutlineSearch size={30} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search something . . ."
              className="w-full sm:w-96 p-3 my-8 ml-3 sm:ml-6 rounded-md transition-width duration-300"
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
