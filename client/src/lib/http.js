
import axios from 'axios'
import toast from 'react-hot-toast'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status
    const msg = err?.response?.data?.message || err.message || 'Unexpected error'
    if (status === 401) {
      toast.error('Session expired. Please login again.')
      localStorage.removeItem('access_token')
      if (location.pathname !== '/login') {
        location.href = '/login'
      }
    } else {
      toast.error(msg)
    }
    return Promise.reject(err)
  }
)

export default http
