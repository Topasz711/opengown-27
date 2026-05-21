import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './src/contexts/AuthContext'
import Navbar from './src/components/Navbar'
import Footer from './src/components/Footer'
import Home from './src/pages/Home'
import Timeline from './src/pages/Timeline'
import Activities from './src/pages/Activities'
import Schedule from './src/pages/Schedule'
import Contact from './src/pages/Contact'
import FAQ from './src/pages/FAQ'
import Login from './src/pages/Auth/Login'
import Register from './src/pages/Auth/Register'
import Dashboard from './src/pages/Dashboard'
import AdminDashboard from './src/pages/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
