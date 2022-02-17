import React from 'react'
import ModalLayout from '../Layout/ModalLayout'

const EditComment = ({ title, company, onClose }) => {
   return (
      <ModalLayout title={title} company={company} onClose={onClose}>
         Izmjeni
      </ModalLayout>
   )
}

export default EditComment
