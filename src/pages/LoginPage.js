import React, { useState } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { useAuthContext } from '../hooks/use-auth'
import { useForm } from 'react-hook-form'
import Input from '../components/UI/Input'
import { loginUser } from '../api/auth'
import styles from './LoginPage.module.css'

const LoginPage = () => {
   const { login } = useAuthContext()
   const { register, handleSubmit } = useForm()
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const onSubmit = async (data) => {
      setIsLoading(true)
      try {
         const response = await loginUser({
            identifier: data.email,
            password: data.password,
         })
         login(response)
         setIsLoading(false)
      } catch (e) {
         setError(e.message)
         setIsLoading(false)
      }
   }

   return (
      <Wrapper>
         <div className={styles['form-wrapper']}>
            <h3>IT me - Login</h3>
            <form action='' onSubmit={handleSubmit(onSubmit)} className='form'>
               <Input
                  name='email'
                  type='text'
                  placeholder='Enter your email'
                  required={true}
                  register={register}
                  autoComplete='email'
                  className={styles.input}
               />
               <Input
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                  required={true}
                  register={register}
                  autoComplete='current-password'
                  className={styles.input}
               />
               <div>{error}</div>
               {isLoading ? (
                  'Loading...'
               ) : (
                  <button type='submit' className={styles.btn}>
                     Login
                  </button>
               )}
            </form>
         </div>
      </Wrapper>
   )
}

export default LoginPage
