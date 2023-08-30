import axios from 'axios'

// Create an Axios instance
// const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: 'https://crm-made-simple-f8a83a9caed2.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add the JWT token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
