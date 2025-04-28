import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useAuthStore } from './store/useAuthStore'

import Navbar from './components/Navbar'

const App = () => {

  const { authUser, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
