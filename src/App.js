import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header/Header'
import CompanyPage from './pages/CompanyPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useAuthContext } from './hooks/use-auth'
import ProfilePage from './pages/ProfilePage'

const App = () => {
   const { isLoggedIn } = useAuthContext()
   return (
      <div style={{ position: 'relative' }}>
         <Header />
         <Routes>
            <Route path='/' element={<HomePage />}></Route>
            {!isLoggedIn && (
               <Route path='login' element={<LoginPage />}></Route>
            )}
            <Route path='signup' element={<RegisterPage />}></Route>
            <Route path='company/:slug/*' element={<CompanyPage />}></Route>
            {isLoggedIn && <Route path='me' element={<ProfilePage />}></Route>}
            <Route path='*' element={<Navigate to='/' />}></Route>
         </Routes>
      </div>
   )
}

export default App
