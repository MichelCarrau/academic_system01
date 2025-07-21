import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Careers from './pages/Careers.jsx'  // Nueva página que crearás

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
