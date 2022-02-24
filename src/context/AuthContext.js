import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext(undefined)

export const AuthContextProvider = (props) => {
   const [token, setToken] = useState('')

   const isLoggedIn = !!token

   const loginHandler = (jwt) => {
      setToken(jwt)
   }

   const logoutHandler = () => {
      setToken('')
   }

   useEffect(() => {
      try {
         const existingToken = localStorage.getItem('token')
         if (existingToken !== token) {
            setToken(existingToken)
         }
      } catch {
         console.log()
      }
   }, [token])

   return (
      <AuthContext.Provider
         value={{
            token,
            isLoggedIn,
            login: loginHandler,
            logout: logoutHandler,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   )
}

export default AuthContext
