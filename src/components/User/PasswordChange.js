import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../UI/Input'
import formStyles from '../../shared/FormStyles.module.css'
import { loginUser } from '../../api/auth'
import { updateUserPassword } from '../../api/auth'

const PasswordChange = ({ user }) => {
   const { register, handleSubmit } = useForm({
      defaultValues: { identifier: user.email },
   })

   const [error, setError] = useState('')
   const [success, setSuccess] = useState('')
   const [loading, setLoading] = useState(false)

   const onSubmit = async (data, e) => {
      setError('')
      setSuccess('')
      setLoading(true)
      try {
         const verifiedUser = await loginUser({
            identifier: data.identifier,
            password: data.currentPassword,
         })

         if (verifiedUser.user.id === user.id) {
            await updateUserPassword(verifiedUser.user.id, data.newPassword)
            e.target.reset()
            setSuccess('Lozinka uspješno promijenjena')
            setLoading(false)
         }
      } catch (ex) {
         setError(ex.message)
         setLoading(false)
      }
   }

   return (
      <div
         style={{
            backgroundColor: 'var(--dark-grey)',
            display: 'flex',
            padding: '1rem',
            width: '100%',
            justifyContent: 'center',
            borderRadius: '0.5rem',
            flexDirection: 'column',
         }}
      >
         <h3 style={{ margin: 0, textAlign: 'center' }}>Izmjena lozinke</h3>
         <hr style={{ width: '100%' }} />

         <form
            action=''
            onSubmit={handleSubmit(onSubmit)}
            className={formStyles.form}
            style={{ marginTop: '1rem' }}
         >
            <input hidden type='text' name='email' autoComplete='email' />
            <Input
               name='currentPassword'
               type='password'
               placeholder='Trenutna lozinka'
               required={true}
               autoComplete='current-password'
               register={register}
               className={formStyles['input-wrapper']}
            />
            <Input
               name='newPassword'
               type='password'
               placeholder='Nova lozinka'
               required={true}
               autoComplete='new-password'
               register={register}
               className={formStyles['input-wrapper']}
            />
            <div>
               <div style={{ color: 'green' }}>{success}</div>
               <div style={{ color: 'var(--red)' }}>{error}</div>
            </div>
            <button
               type='submit'
               style={{ _hover: { backgroundColor: 'var(--black)' } }}
            >
               {loading ? 'Loading...' : 'Ažuriraj lozinku'}
            </button>
         </form>
      </div>
   )
}

export default PasswordChange
