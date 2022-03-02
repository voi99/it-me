import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import Interceptors from './api/Interceptors'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <AuthContextProvider>
            <Interceptors />
            <App />
         </AuthContextProvider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
)
