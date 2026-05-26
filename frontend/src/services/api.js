import axios from 'axios'

// ใช้ API_BASE_URL แบบเต็ม URL เพื่อหลีกเลี่ยงปัญหา 405 บน Vercel
// ใน development ใช้ localhost, ใน production ให้เปลี่ยนเป็น URL ของ Backend ที่ deploy แยกไว้
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? 'http://localhost:8000/api' 
    : 'https://your-backend-api.com/api') // <-- เปลี่ยนเป็น URL Backend จริงของคุณเมื่อ deploy

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  login: (email, password) => {
    // สร้าง Form Data ตามที่ OAuth2PasswordRequestForm ของ FastAPI ต้องการ
    const params = new URLSearchParams()
    params.append('username', email) // Backend ใช้คำว่า username รับแทน email
    params.append('password', password)
    
    return api.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
}

// Application APIs
export const applicationAPI = {
  submit: (data) => api.post('/applications', data),
  get: () => api.get('/applications/my'),
  update: (id, data) => api.put(`/applications/${id}`, data),
  uploadDocument: (id, formData) => 
    api.post(`/applications/${id}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

// Schedule APIs
export const scheduleAPI = {
  getPublic: () => api.get('/schedule/public'),
  getPrivate: () => api.get('/schedule/private'),
}

// Contact APIs
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
}

export default api
