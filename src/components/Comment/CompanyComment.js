import React, { useState } from 'react'
import styles from '../../shared/CompanyCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faEllipsisVertical,
   faPenToSquare,
   faTrash,
} from '@fortawesome/free-solid-svg-icons'
import usePageActions from '../../hooks/use-page-actions'
import DeleteComment from './DeleteComment'
import Modal from '../UI/Modal'
import EditComment from './EditComment'
import { useAuthContext } from '../../hooks/use-auth'
import { Animate } from '../../animations/Animate'
import { AnimatePresence } from 'framer-motion'

const CompanyComment = ({
   comment,
   userId,
   company,
   refresh,
   commentHasChanged,
}) => {
   const [showActions, setShowActions] = useState(false)
   const handleShowActions = () => {
      setShowActions((prevState) => !prevState)
   }
   const [action, setAction] = useState('delete')

   const { openModal, openModalHandler, closeModalHandler } = usePageActions()
   const { isLoggedIn } = useAuthContext()

   return (
      <>
         {openModal && (
            <Modal>
               {action === 'delete' ? (
                  <DeleteComment
                     title='Obrisi komentar'
                     onClose={closeModalHandler}
                     refresh={refresh}
                     company={company}
                     commentId={comment.id}
                     commentHasChanged={commentHasChanged}
                  />
               ) : (
                  <EditComment
                     title='Izmjeni komentar'
                     onClose={closeModalHandler}
                     refresh={refresh}
                     company={company}
                     comment={comment}
                     commentHasChanged={commentHasChanged}
                  />
               )}
            </Modal>
         )}
         <div key={comment.id} className={styles.element}>
            <div>
               <div className={styles['element-actions']}>
                  <h3>Pozitivno</h3>
                  <div className={styles['actions-wrapper']}>
                     <AnimatePresence exitBeforeEnter>
                        {showActions && (
                           <Animate className={styles['all-actions']}>
                              <FontAwesomeIcon
                                 icon={faPenToSquare}
                                 onClick={() => {
                                    setAction('edit')
                                    openModalHandler()
                                 }}
                                 className={styles.icon}
                              />
                              <FontAwesomeIcon
                                 icon={faTrash}
                                 onClick={() => {
                                    setAction('delete')
                                    openModalHandler()
                                 }}
                                 className={styles.icon}
                              />
                           </Animate>
                        )}
                     </AnimatePresence>
                     {isLoggedIn &&
                        +comment.attributes.user.data.id === +userId && (
                           <FontAwesomeIcon
                              icon={faEllipsisVertical}
                              className={styles.actions}
                              onClick={handleShowActions}
                           />
                        )}
                  </div>
               </div>
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
      </>
   )
}

export default CompanyComment
