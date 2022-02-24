import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import styles from '../../shared/FormStyles.module.css'
import { useForm } from 'react-hook-form'
import ModalSelects from '../UI/ModalSelects'
import useSelectData from '../../hooks/use-select-data'
import ModalTextarea from '../UI/ModalTextarea'
import { updateComment } from '../../api/comment'

const EditComment = ({
   title,
   company,
   onClose,
   comment,
   refresh,
   commentHasChanged,
}) => {
   const [positions, seniorities] = useSelectData()
   const { register, handleSubmit, control } = useForm({
      defaultValues: {
         position: {
            label: comment.attributes.position.data.attributes.name,
            value: comment.attributes.position.data.id.toString(),
         },
         seniority: {
            label: comment.attributes.seniority.data.attributes.name,
            value: comment.attributes.seniority.data.id.toString(),
         },
      },
   })
   const [error, setError] = useState()

   const onSubmit = async (data) => {
      try {
         await updateComment(comment.id, {
            ...data,
            seniority: data.seniority.value,
            position: data.position.value,
            publishedAt: null,
         })
         refresh()
         commentHasChanged()
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
               name='positive'
               label='Pozitivno'
               register={register}
               defaultValue={comment.attributes.positive}
            />

            <ModalTextarea
               name='negative'
               label='Negativno'
               defaultValue={comment.attributes.negative}
               register={register}
            />
            <div className='error'>{error}</div>
            <button className={styles.btn}>Ažuriraj komentar</button>
         </form>
      </ModalLayout>
   )
}

export default EditComment
