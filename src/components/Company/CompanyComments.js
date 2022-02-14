import React, { useState } from 'react'
import styles from './CompanyComments.module.css'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import Modal from '../UI/Modal'

const CompanyComments = ({ comments }) => {
   const [openModal, setOpenModal] = useState()
   const addComment = () => {
      setOpenModal(true)
   }

   const closeModal = () => {
      setOpenModal(false)
   }

   return (
      <>
         {openModal && <Modal onClose={closeModal}>Opened!</Modal>}
         <CompanySectionLayout title='Komentari' add={addComment}>
            {comments.map((comment) => (
               <div key={comment.id} className={styles.comment}>
                  <div>
                     <h3>Pozitivno</h3>
                     <p>
                        {comment.attributes.positive
                           ? comment.attributes.positive
                           : 'Korisnik nije naveo pozitivne strane rada u kompaniji'}
                     </p>
                  </div>
                  <div>
                     <h3>Negativno</h3>
                     <p>
                        {comment.attributes.negative
                           ? comment.attributes.negative
                           : 'Korisnik nije naveo lose strane rada u kompaniji'}
                     </p>
                  </div>
                  <div className={styles['employee-info']}>
                     <p>{`${comment.attributes.position.data.attributes.name}(${comment.attributes.seniority.data.attributes.name})`}</p>
                  </div>
               </div>
            ))}
         </CompanySectionLayout>
      </>
   )
}

export default CompanyComments
