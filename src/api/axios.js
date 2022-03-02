import axios from 'axios'

const apiURL = process.env.REACT_APP_API_URL

const API = axios.create({
   baseURL: apiURL,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
   },
})

export default API
