import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import StressRelief from './pages/StressRelief'
import Login from './pages/Login'
import Register from './pages/Register'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <Navbar/>
           <main className='flex-1 container mx-auto px-4 py-8'>
            <Routes>
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/notes" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/stress" element={<RequireAuth><StressRelief /></RequireAuth>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
           </main>
      <Footer/>
    </div>
  )
}

export default App