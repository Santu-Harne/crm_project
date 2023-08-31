import axios from 'axios'

// Create an Axios instance
// const token = localStorage.getItem('token');
<<<<<<< HEAD
const api = axios.create();
=======
const api = axios.create({
  baseURL: 'https://crm-made-simple-f8a83a9caed2.herokuapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
});
>>>>>>> cfdc35ffcacf2c42b00a99958e11f83421d1f086

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
