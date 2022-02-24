import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useForm } from 'react-hook-form'
import { addComment } from '../../api/comment'
import useSelectData from '../../hooks/use-select-data'
import ModalSelects from '../UI/ModalSelects'
import styles from '../../shared/FormStyles.module.css'
import { getCurrentUser } from '../../api/auth'
import { useAuthContext } from '../../hooks/use-auth'
import ModalTextarea from '../UI/ModalTextarea'

const AddComment = ({ title, company, onClose, refresh }) => {
   const { register, handleSubmit, control } = useForm()

   const [positions, seniorities] = useSelectData()
   const [error, setError] = useState('')
   const { logout } = useAuthContext()

   const onSubmit = async (data) => {
      try {
         if (
            data.positive.trim().length === 0 &&
            data.negative.trim().length === 0
         ) {
            setError(
               'Morate dodati pozitivne ili negativne strane rada u firmi!'
            )
            return
         } else if (!data.position || !data.seniority) {
            setError('Morate dodati poziciju i nivo iskustva!')
            return
         }
         const user = await getCurrentUser()

         await addComment({
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
               name='positive'
               label='Pozitivno'
               defaultValue=''
               register={register}
            />

            <ModalTextarea
               name='negative'
               label='Negativno'
               defaultValue=''
               register={register}
            />

            <div className='error'>{error}</div>
            <button className={styles.btn}>Dodaj komentar</button>
         </form>
      </ModalLayout>
   )
}

export default AddComment
