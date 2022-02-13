import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export const useAuthContext = () => {
   const ctx = useContext(AuthContext)
   return ctx
}
