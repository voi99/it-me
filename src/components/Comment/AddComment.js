import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useForm } from 'react-hook-form'
import { addComment } from '../../api/comment'
import useSelectData from '../../hooks/use-select-data'
import ModalSelects from '../UI/ModalSelects'
import styles from '../../shared/FormStyles.module.css'
import { getCurrentUser } from '../../api/auth'

const AddComment = ({ title, company, onClose, refresh }) => {
   const { register, handleSubmit } = useForm()

   const [positions, seniorities] = useSelectData()
   const [error, setError] = useState('')

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
         }
         const user = await getCurrentUser()
         await addComment({ ...data, company: company.id, user: user.id })
         refresh()
         onClose()
      } catch (e) {
         setError(e)
      }
   }

   return (
      <ModalLayout title={title} company={company} onClose={onClose}>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <ModalSelects
               positions={positions}
               seniorities={seniorities}
               register={register}
            />

            <div className={styles['input-wrapper']}>
               <label htmlFor='positive'>Pozitivno</label>
               <textarea
                  name='positive'
                  id='positive'
                  cols='30'
                  rows='10'
                  {...register('positive')}
               ></textarea>
            </div>

            <div className={styles['input-wrapper']}>
               <label htmlFor='negative'>Negativno</label>
               <textarea
                  name='negative'
                  id='negative'
                  cols='30'
                  rows='10'
                  {...register('negative')}
               ></textarea>
            </div>
            <div className='error'>{error}</div>
            <button className={styles.btn}>Dodaj komentar</button>
         </form>
      </ModalLayout>
   )
}

export default AddComment
