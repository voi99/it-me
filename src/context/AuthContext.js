import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext(undefined)

export const AuthContextProvider = (props) => {
   const [user, setUser] = useState({})

   const isLoggedIn = !!user.jwt

   const loginHandler = ({ jwt, user }) => {
      setUser({
         jwt,
         id: user.id,
      })
   }

   const logoutHandler = () => {
      setUser({
         jwt: null,
         id: null,
      })
   }

   useEffect(() => {
      try {
         const existingUser = JSON.parse(localStorage.getItem('user'))
         if (existingUser) {
            setUser(existingUser)
         }
      } catch {
         console.log()
      }
   }, [])

   useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user))
   }, [user])

   return (
      <AuthContext.Provider
         value={{
            user,
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
