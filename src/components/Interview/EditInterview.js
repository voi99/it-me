import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSelectData from '../../hooks/use-select-data'
import ModalLayout from '../Layout/ModalLayout'
import styles from '../../shared/FormStyles.module.css'
import ModalSelects from '../UI/ModalSelects'
import ModalTextarea from '../UI/ModalTextarea'
import { updateInterview } from '../../api/interview'

const EditInterview = ({
   title,
   company,
   onClose,
   interview,
   refresh,
   interviewHasChanged,
}) => {
   const [positions, seniorities] = useSelectData()
   const { register, handleSubmit, control } = useForm({
      defaultValues: {
         position: {
            label: interview.attributes.position.data.attributes.name,
            value: interview.attributes.position.data.id.toString(),
         },
         seniority: {
            label: interview.attributes.seniority.data.attributes.name,
            value: interview.attributes.seniority.data.id.toString(),
         },
      },
   })
   const [error, setError] = useState()

   const onSubmit = async (data) => {
      try {
         await updateInterview(interview.id, {
            ...data,
            seniority: data.seniority.value,
            position: data.position.value,
            publishedAt: null,
         })
         refresh()
         interviewHasChanged()
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

            <ModalTextarea
               name='hrInterview'
               label='HR intervju'
               register={register}
               defaultValue={interview.attributes.hrInterview}
            />

            <ModalTextarea
               name='technicalInterview'
               label='Tehnicki intervju'
               defaultValue={interview.attributes.technicalInterview}
               register={register}
            />
            <div className='error'>{error}</div>
            <button className={styles.btn}>Ažuriraj komentar</button>
         </form>
      </ModalLayout>
   )
}

export default EditInterview
