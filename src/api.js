import axios from 'axios';

const api = axios.create({
  baseURL: 'https://followuppro-backend.onrender.com/api',
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
      alert('Network error: Unable to reach the server. Please try again later.');
    } else {
      const status = error.response.status;
      if (status === 401) {
        localStorage.removeItem('token');
        alert('Session expired or unauthorized. Please log in again.');
        window.location.href = '/login';
      } else if (status === 400) {
        // Show validation or bad request errors
        const msg = error.response.data?.error || 'Bad request. Please check your input.';
        alert(msg);
      } else if (status >= 500) {
        alert('Server error. Please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default api;