import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import ModalSelects from '../UI/ModalSelects'
import useSelectData from '../../hooks/use-select-data'
import { useForm } from 'react-hook-form'
import styles from '../../shared/FormStyles.module.css'
import { addSalary } from '../../api/salary'

const AddSalary = ({ title, company, onClose, refresh }) => {
   const [positions, seniorities] = useSelectData()
   const { register, handleSubmit, control } = useForm()
   const [error, setError] = useState()

   const onSubmit = async (data) => {
      try {
         if (!data.position || !data.seniority) {
            setError('Morate dodati poziciju i nivo iskustva!')
            return
         }
         await addSalary({
            ...data,
            position: data.position.value,
            seniority: data.seniority.value,
            company: company.id,
         })
         refresh()
         onClose()
      } catch (e) {
         setError(e.message)
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
            <div className={styles['input-wrapper']}>
               <label htmlFor='amount'>Plata</label>
               <input
                  name='amount'
                  type='number'
                  step='0.01'
                  id='amount'
                  required
                  {...register('amount')}
                  style={{
                     color: 'var(--dark-grey)',
                     backgroundColor: 'white',
                     borderRadius: '0.3rem',
                  }}
               />
            </div>
            <div className='error'>{error}</div>
            <button className={styles.btn}>Dodaj platu</button>
         </form>
      </ModalLayout>
   )
}

export default AddSalary
