import axios from 'axios';

// Axios instance to reuse base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

// Add access token from localStorage for every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
