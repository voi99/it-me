import { useEffect, useRef } from 'react'
import { useAuthContext } from '../hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import API from './axios'

const SetupInterceptors = () => {
   const { logout } = useAuthContext()
   const navigate = useNavigate()

   const interceptorId = useRef(null)

   useEffect(() => {
      interceptorId.current = API.interceptors.response.use(
         undefined,
         (err) => {
            if (err.response.status === 401) {
               logout()
               navigate('/login')
            }
         }
      )
      return () => {
         API.interceptors.response.eject(interceptorId.current)
      }
   }, [logout, navigate])
   return null
}

export default SetupInterceptors
