/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article, Dictionary, MyProfile } from './routes'
import { Modal } from './components'
import { AiFillLock } from 'react-icons/ai'

function App() {

  const [isModalOpen, setModalOpen] = useState(false)

  const openLoginModal = () => {
    setModalOpen(true)
  }

  const closeLoginModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Dictionary />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
      <button
        className="fixed bottom-8 right-6 bg-blue-500 text-white rounded-full p-3 transition-transform transform hover:scale-105 hover:-translate-y-4 hover:-translate-x-6 hover:shadow-md"
        onClick={openLoginModal}
      >
        <AiFillLock size={30} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeLoginModal} />
    </>
  )
}

export default App
