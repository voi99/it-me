import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
   return (
      <div>
         <Routes>
            <Route path='/' element={<HomePage />}></Route>
         </Routes>
      </div>
   )
}

export default App
