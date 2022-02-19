import React from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { useLocation } from 'react-router-dom'

const VerifyEmail = () => {
   const { state } = useLocation()

   return (
      <Wrapper>
         <h2>Please confirm your email</h2>

         <p>
            You're almost there! We sent an email to {state.email} <br />
            Confirm and login 😀
         </p>
      </Wrapper>
   )
}

export default VerifyEmail
