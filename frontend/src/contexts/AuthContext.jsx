import React, { createContext, useState, useContext, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in via token
    const token = localStorage.getItem('token')
    
    if (token) {
      // Fetch user data from API
      authAPI.me()
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      // เรียกใช้ authAPI ตัวที่เรา import มาข้างบนให้ถูกต้อง
      const response = await authAPI.login(email, password)
      const { access_token } = response.data
      
      localStorage.setItem('token', access_token)
      
      // Fetch user data ดึงข้อมูลผู้ใช้งานปัจจุบันกลับมาเก็บใน state
      const userResponse = await authAPI.me()
      setUser(userResponse.data)
      
      return userResponse.data
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error.response?.data?.detail || 'การเข้าสู่ระบบไม่สำเร็จ')
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      throw new Error(error.response?.data?.detail || 'การสมัครไม่สำเร็จ')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
