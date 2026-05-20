import React, { createContext, useState, useContext, useEffect } from 'react'

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
    // Check if user is logged in via localStorage
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    
    // Find user with matching email and password
    const foundUser = registeredUsers.find(
      u => u.email === email && u.password === password
    )

    if (!foundUser) {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }

    // Set user data to localStorage
    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      status: foundUser.status || 'pending'
    }
    
    localStorage.setItem('token', 'demo-token-' + Date.now())
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (userData) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    
    // Check if email already exists
    const emailExists = registeredUsers.some(u => u.email === userData.email)
    if (emailExists) {
      throw new Error('อีเมลนี้ถูกใช้งานแล้ว')
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    registeredUsers.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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
