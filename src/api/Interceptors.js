import { useEffect, useRef } from 'react'
import { useAuthContext } from '../hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import API from './axios'

const Interceptors = () => {
   const { logout } = useAuthContext()
   const navigate = useNavigate()

   const interceptorId = useRef(null)

   useEffect(() => {
      interceptorId.current = API.interceptors.request.use((config) => {
         const token = localStorage.token

         if (!token) {
            return config
         } else {
            config.headers.Authorization = `Bearer ${token}`
         }
         return config
      })

      interceptorId.current = API.interceptors.response.use(
         (res) => res,
         (err) => {
            if (err.response.status === 401) {
               logout()
               navigate('/login')
            }
            return Promise.reject(err)
         }
      )
      return () => {
         API.interceptors.request.eject(interceptorId.current)
         API.interceptors.response.eject(interceptorId.current)
      }
   }, [logout, navigate])
   return null
}

export default Interceptors
