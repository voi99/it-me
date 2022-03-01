import React, { useState } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import styles from './LoginPage.module.css'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import Input from '../components/UI/Input'
import { createUser } from '../api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { Animate } from '../animations/Animate'

const RegisterPage = () => {
   const { register, handleSubmit } = useForm()
   const [error, setError] = useState()
   const [isLoading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   const onSubmit = async (data) => {
      setIsLoading(true)
      try {
         await createUser(data)
         navigate('/verify', { state: { email: data.email } })
      } catch (e) {
         setError(e.message)
         setIsLoading(false)
      }
   }

   return (
      <Animate>
         <Wrapper>
            <div className={styles['form-wrapper']}>
               <h3>IT me - Join</h3>
               <form
                  action=''
                  onSubmit={handleSubmit(onSubmit)}
                  className='form'
               >
                  <div className={styles['input-wrapper']}>
                     <FontAwesomeIcon
                        icon={faUser}
                        size='2x'
                        className={styles.icon}
                     />
                     <Input
                        name='username'
                        type='text'
                        placeholder='Enter your full name'
                        required={true}
                        register={register}
                        autoComplete='username'
                        className={styles.input}
                     />
                  </div>
                  <div className={styles['input-wrapper']}>
                     <FontAwesomeIcon
                        icon={faEnvelope}
                        size='2x'
                        className={styles.icon}
                     />
                     <Input
                        name='email'
                        type='text'
                        placeholder='Enter your email'
                        required={true}
                        register={register}
                        autoComplete='email'
                        className={styles.input}
                     />
                  </div>
                  <div className={styles['input-wrapper']}>
                     <FontAwesomeIcon
                        icon={faLock}
                        size='2x'
                        className={styles.icon}
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
                  </div>
                  <div className='error'>{error}</div>
                  {isLoading ? (
                     'Loading...'
                  ) : (
                     <button type='submit' className={styles.btn}>
                        Join
                     </button>
                  )}
               </form>
            </div>
            <div className={styles['other-actions']}>
               <Link to='/login'>Imate nalog ?</Link>
            </div>
         </Wrapper>
      </Animate>
   )
}

export default RegisterPage
