/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article, Dictionary, MyProfile, Register, AdminHome, AdminUsers } from './routes'
import { Modal } from './components'
import { AiFillLock, AiOutlineUnlock } from 'react-icons/ai'

function App() {

  const [isModalOpen, setModalOpen] = useState(false)
  const [isButtonLocked, setButtonLocked] = useState(true)

  const openLoginModal = () => {
    setModalOpen(true)
  }

  const closeLoginModal = () => {
    setModalOpen(false)
    setButtonLocked(true)
  }

  const handleButtonClick = () => {
    if (isButtonLocked) {
      openLoginModal()
    } else {
      closeLoginModal()
    }
    setButtonLocked(!isButtonLocked)
  }

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dictionary />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
      <button
        className={`fixed bottom-8 right-6 bg-blue-500 text-white rounded-full p-3 transition-transform transform active:scale-105 active:-translate-y-4 active:-translate-x-6 hover:shadow-md ${
          isButtonLocked ? 'cursor-pointer' : 'cursor-default'
        }`}
        onClick={handleButtonClick}
      >
        {isButtonLocked ? (
          <AiFillLock size={30} />
        ) : (
          <AiOutlineUnlock size={30} />
        )}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeLoginModal} />
    </>
  )
}

export default App
