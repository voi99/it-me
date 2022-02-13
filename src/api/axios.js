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
   const user = localStorage.user
   if (!user) {
      return config
   }

   const parsedUser = JSON.parse(user)
   if (parsedUser?.jwt) {
      config.headers.Authorization = `Bearer ${parsedUser.jwt}`
   }

   return config
})

export default API
