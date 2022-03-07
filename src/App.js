import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header/Header'
import CompanyPage from './pages/CompanyPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useAuthContext } from './hooks/use-auth'
import ProfilePage from './pages/ProfilePage'
import VerifyEmail from './pages/VerifyEmail'
import Credits from './pages/Credits'
import CompaniesPage from './pages/CompaniesPage'

const App = () => {
   const { isLoggedIn } = useAuthContext()

   return (
      <div style={{ position: 'relative' }}>
         <Header />
         <Routes>
            <Route path='/' element={<HomePage />}></Route>
            {!isLoggedIn && (
               <>
                  <Route path='login' element={<LoginPage />}></Route>
                  <Route path='signup' element={<RegisterPage />}></Route>
                  <Route path='verify' element={<VerifyEmail />}></Route>
               </>
            )}
            <Route path='company/:slug/*' element={<CompanyPage />}></Route>
            <Route path='companies' element={<CompaniesPage />}></Route>
            <Route path='me' element={<ProfilePage />}></Route>
            <Route path='credits' element={<Credits />}></Route>
            <Route path='*' element={<Navigate to='/' />}></Route>
         </Routes>
      </div>
   )
}

export default App
