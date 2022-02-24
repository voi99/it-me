import React, { useState } from 'react'
import { deleteInterview } from '../../api/interview'
import ModalLayout from '../Layout/ModalLayout'
import styles from '../Comment/DeleteComment.module.css'

const DeleteInterview = ({
   title,
   company,
   onClose,
   interviewId,
   interviewHasChanged,
}) => {
   const [error, setError] = useState()
   const handleDelete = async () => {
      try {
         await deleteInterview(interviewId)
         interviewHasChanged()
         onClose()
      } catch (e) {
         setError(e.message)
      }
   }

   return (
      <ModalLayout title={title} company={company} onClose={onClose}>
         <h3>Da li ste sigurni da želite obrisati intervju?</h3>
         {error}
         <div className={styles.options}>
            <button onClick={onClose}>Otkaži</button>
            <button onClick={handleDelete}>Obriši</button>
         </div>
      </ModalLayout>
   )
}

export default DeleteInterview
