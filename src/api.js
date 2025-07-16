import axios from 'axios';

// Updated to use your deployed backend URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://followuppro-backend.onrender.com/api',
  timeout: 30000, // 30 seconds timeout for production
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or server is down
      console.error('Network error:', error);
      alert('Network error: Unable to reach the server. Please check your internet connection.');
    } else {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        alert('Session expired or unauthorized. Please log in again.');
        window.location.href = '/login';
      } else if (status === 400) {
        // Show validation or bad request errors
        const msg = error.response.data?.error || 'Bad request. Please check your input.';
        alert(msg);
      } else if (status >= 500) {
        alert('Server error. Please try again later.');
      } else if (status === 403) {
        alert('Access denied. You do not have permission to perform this action.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;