import { handleLogin } from '@/components/order/Packages'
import axios from 'axios'

let hasRetried = false

const axiosInstance = axios.create({
  baseURL: 'https://buprolat.mitopup.com/api',
  // baseURL: "http://192.168.29.200:8000/api/",
  headers: { 'Content-Type': 'application/json' },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    const token = localStorage.getItem('access') // Retrieve auth token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (error) {
    // Handle the error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    debugger
    const originalRequest = error.config
    if (error.response?.status === 401 && !hasRetried) {
      hasRetried = true

      try {
        // Attempt to login and get a new token
        await handleLogin()

        // Retry the original request with new token
        const newAccessToken = localStorage.getItem('access')
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        }

        return axios(originalRequest) // Retry the request
      } catch (loginError) {
        // Login failed again, reload the page
        window.location.reload()
      }
    } else if (error.response?.status === 401 && hasRetried) {
      // Already retried, now just reload
      window.location.reload()
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
