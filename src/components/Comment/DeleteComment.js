import React, { useState } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import styles from './DeleteComment.module.css'
import { deleteComment } from '../../api/comment'

const DeleteComment = ({
   title,
   company,
   onClose,
   commentId,
   commentHasChanged,
}) => {
   const [error, setError] = useState()
   const handleDelete = async () => {
      try {
         await deleteComment(commentId)
         commentHasChanged()
         onClose()
      } catch (e) {
         setError(e.message)
      }
   }

   return (
      <ModalLayout title={title} company={company} onClose={onClose}>
         <h3>Da li ste sigurni da želite obrisati komentar?</h3>
         {error}
         <div className={styles.options}>
            <button onClick={onClose}>Otkaži</button>
            <button onClick={handleDelete}>Obriši</button>
         </div>
      </ModalLayout>
   )
}

export default DeleteComment
