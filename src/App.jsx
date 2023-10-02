/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article, Dictionary, MyProfile } from './routes'
import { Modal } from './components'

function App() {

  const [isModalOpen, setModalOpen] = useState(false)

  const openLoginModal = () => {
    setModalOpen(true);
  }

  const closeLoginModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <button
        className="bg-blue-500 text-white rounded-lg px-4 py-2"
        onClick={openLoginModal}
      >
        Open Login Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={closeLoginModal} />

      <Routes>
        <Route exact path='/' element={<Dictionary />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  )
}

export default App
