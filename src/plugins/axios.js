import axios from 'axios';
const API_URL = 'http://192.168.1.11:8000/api'
// const API_URL = 'https://attendance-scanner-server.herokuapp.com'
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 60 * 1000
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

export default api



