/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Article, Dictionary, MyProfile } from './routes'

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Dictionary />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </>
  )
}

export default App
