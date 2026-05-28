import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../supabaseClient'

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
    // 1. ดึงข้อมูล session ปัจจุบันเมื่อโหลดแอปพลิเคชัน
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
      }
      setUser(session?.user ?? null)
      setLoading(false)
    }

    fetchSession()

    // 2. ดักจับการเปลี่ยนแปลงของสถานะ Auth (เช่น เมื่อผู้ใช้กดล็อกอิน หรือ ล็อกเอาต์)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // ทำความสะอาด listener เมื่อ component ถูกทำลาย
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ฟังก์ชันสำหรับล็อกอิน
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  // ฟังก์ชันสำหรับสมัครสมาชิก
  const register = async (email, password, userMetadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userMetadata, // สามารถแนบข้อมูลเพิ่มเติม เช่น ชื่อ หรือ เบอร์โทร ไปเก็บใน Supabase ได้
      }
    })
    if (error) throw error
    return data
  }

  // ฟังก์ชันสำหรับออกจากระบบ
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
