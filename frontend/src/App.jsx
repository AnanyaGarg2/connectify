import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <Navbar/>
           <main className='flex-1 container mx-auto px-4 py-8'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateNote />} />
            </Routes>
           </main>
      <Footer/>
    </div>
  )
}

export default App