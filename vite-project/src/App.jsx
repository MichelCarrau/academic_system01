import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Careers from './pages/Careers.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<a>Home Page</a>} />
          <Route path="/Login" element={<a>Login Page</a>} />
          <Route path="/Register" element={<a>Register Page</a>} />
          <Route path="/careers" element={<careers />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App