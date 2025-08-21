import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // putus siklus: jangan panggil store/Redux di sini
      localStorage.removeItem('access_token')
      if (location.pathname !== '/login') location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default http
