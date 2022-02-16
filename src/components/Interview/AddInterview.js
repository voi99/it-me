import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useForm } from 'react-hook-form'
import useSelectData from '../../hooks/use-select-data'
import ModalSelects from '../UI/ModalSelects'
import styles from '../../shared/FormStyles.module.css'
import { addInterview } from '../../api/interview'

const AddInterview = ({ title, company, onClose, refresh }) => {
   const { register, handleSubmit } = useForm()

   const [positions, seniorities] = useSelectData()
   const [error, setError] = useState('')

   const onSubmit = async (data) => {
      try {
         if (
            data.hrInterview.trim().length === 0 &&
            data.technicalInterview.trim().length === 0
         ) {
            setError('Morate dodati utisak sa HR ili Tehnickog intervju-a!')
            return
         }
         await addInterview({ ...data, company: company.id })
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
               <label htmlFor='positive'>HR intervju</label>
               <textarea
                  name='hrInterview'
                  id='hrInterview'
                  cols='30'
                  rows='10'
                  {...register('hrInterview')}
               ></textarea>
            </div>

            <div className={styles['input-wrapper']}>
               <label htmlFor='technicalInterview'>Tehnicki intervju</label>
               <textarea
                  name='technicalInterview'
                  id='technicalInterview'
                  cols='30'
                  rows='10'
                  {...register('technicalInterview')}
               ></textarea>
            </div>
            <div className='error'>{error}</div>
            <button className={styles.btn}>Dodaj intervju</button>
         </form>
      </ModalLayout>
   )
}

export default AddInterview
