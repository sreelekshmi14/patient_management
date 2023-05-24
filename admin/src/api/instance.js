import axios from 'axios';

const token = localStorage.getItem('token');
const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { Authorization: `Bearer ${token}` },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
