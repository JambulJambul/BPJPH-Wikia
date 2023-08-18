/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article, Dictionary, Login, MyProfile } from './routes'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Dictionary />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  )
}

export default App
