import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        }
        throw new Error(error.message || 'เข้าสู่ระบบไม่สำเร็จ')
      }

      // บันทึกข้อมูลผู้ใช้ลงใน localStorage
      localStorage.setItem('token', data.session?.access_token)
      localStorage.setItem('user', JSON.stringify({
        id: data.user?.id,
        email: data.user?.email,
        ...data.user?.user_metadata
      }))

      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="card">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            เข้าสู่ระบบ
          </h1>
          <p className="text-center text-gray-600 mb-8">
            ยินดีต้อนรับกลับมาสู่ Opengown Camp 27th
          </p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-600">จำฉันไว้</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                ลืมรหัสผ่าน?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-6">
            <button 
              onClick={async () => {
                try {
                  // Simulated Google Login - create user if not exists
                  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
                  const googleEmail = 'googleuser@gmail.com'
                  
                  let existingGoogleUser = registeredUsers.find(u => u.email === googleEmail)
                  
                  if (!existingGoogleUser) {
                    // Create new Google user
                    const newUser = {
                      id: Date.now(),
                      name: 'Google User',
                      email: googleEmail,
                      status: 'active',
                      provider: 'google',
                      password: '',
                      createdAt: new Date().toISOString()
                    }
                    registeredUsers.push(newUser)
                    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
                    existingGoogleUser = newUser
                  }
                  
                  // Login the Google user
                  const userData = {
                    id: existingGoogleUser.id,
                    name: existingGoogleUser.name,
                    email: existingGoogleUser.email,
                    status: existingGoogleUser.status
                  }
                  
                  localStorage.setItem('token', 'google-token-' + Date.now())
                  localStorage.setItem('user', JSON.stringify(userData))
                  
                  // Update auth context state
                  window.dispatchEvent(new Event('storage'))
                  navigate('/dashboard')
                } catch (err) {
                  console.error('Google login error:', err)
                }
              }}
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">เข้าสู่ระบบด้วย Google</span>
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            ยังไม่มีบัญชี?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
