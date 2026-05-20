import axios from 'axios'

const API_BASE_URL = '/api'

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
  login: (email, password) => api.post('/auth/login', { email, password }),
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
