import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

const API = axios.create({
   baseURL: apiURL,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
})

API.interceptors.request.use((config) => {
   const token = localStorage.token

   if (!token) {
      return config
   } else {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config
})

export default API
