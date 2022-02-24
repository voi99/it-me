import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useForm } from 'react-hook-form'
import useSelectData from '../../hooks/use-select-data'
import ModalSelects from '../UI/ModalSelects'
import styles from '../../shared/FormStyles.module.css'
import { addInterview } from '../../api/interview'
import { getCurrentUser } from '../../api/auth'
import { useAuthContext } from '../../hooks/use-auth'
import ModalTextarea from '../UI/ModalTextarea'

const AddInterview = ({ title, company, onClose, refresh }) => {
   const { register, handleSubmit, control } = useForm()

   const [positions, seniorities] = useSelectData()
   const [error, setError] = useState('')
   const { logout } = useAuthContext()

   const onSubmit = async (data) => {
      try {
         if (
            data.hrInterview.trim().length === 0 &&
            data.technicalInterview.trim().length === 0
         ) {
            setError('Morate dodati utisak sa HR ili Tehnickog intervju-a!')
            return
         } else if (!data.position || !data.seniority) {
            setError('Morate dodati poziciju i nivo iskustva!')
            return
         }
         const user = await getCurrentUser()

         await addInterview({
            ...data,
            company: company.id,
            user: user.id,
            position: data.position.value,
            seniority: data.seniority.value,
            publishedAt: null,
         })
         refresh()
         onClose()
      } catch (e) {
         setError(e.message)
         if (e.message === 'Unauthorized') {
            logout()
         }
      }
   }

   return (
      <ModalLayout title={title} company={company} onClose={onClose}>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <ModalSelects
               positions={positions}
               seniorities={seniorities}
               register={register}
               control={control}
            />

            <ModalTextarea
               name='hrInterview'
               label='HR intervju'
               defaultValue=''
               register={register}
            />

            <ModalTextarea
               name='technicalInterview'
               label='Tehnicki intervju'
               defaultValue=''
               register={register}
            />
            <div className='error'>{error}</div>
            <button className={styles.btn}>Dodaj intervju</button>
         </form>
      </ModalLayout>
   )
}

export default AddInterview
