import React, { useState } from 'react'
import styles from '../../shared/CompanyCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faEllipsisVertical,
   faPenToSquare,
   faTrash,
} from '@fortawesome/free-solid-svg-icons'
import usePageActions from '../../hooks/use-page-actions'
import Modal from '../UI/Modal'
import { useAuthContext } from '../../hooks/use-auth'
import { Animate } from '../../animations/Animate'
import EditInterview from './EditInterview'
import DeleteInterview from './DeleteInterview'

const CompanyInterview = ({
   interview,
   userId,
   company,
   refresh,
   interviewHasChanged,
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
                  <DeleteInterview
                     title='Obrisi komentar'
                     onClose={closeModalHandler}
                     refresh={refresh}
                     company={company}
                     interviewId={interview.id}
                     interviewHasChanged={interviewHasChanged}
                  />
               ) : (
                  <EditInterview
                     title='Izmjeni komentar'
                     onClose={closeModalHandler}
                     refresh={refresh}
                     company={company}
                     interview={interview}
                     interviewHasChanged={interviewHasChanged}
                  />
               )}
            </Modal>
         )}
         <div key={interview.id} className={styles.element}>
            <div>
               <div className={styles['element-actions']}>
                  <h3>HR intervju</h3>
                  <div className={styles['actions-wrapper']}>
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
                     {isLoggedIn &&
                        +interview.attributes.user.data.id === +userId && (
                           <FontAwesomeIcon
                              icon={faEllipsisVertical}
                              className={styles.actions}
                              onClick={handleShowActions}
                           />
                        )}
                  </div>
               </div>
               <p>
                  {interview.attributes.hrInterview
                     ? interview.attributes.hrInterview
                     : 'Korisnik nije naveo utiske sa HR intervju-a'}
               </p>
            </div>
            <div>
               <h3>Negativno</h3>
               <p>
                  {interview.attributes.technicalInterview
                     ? interview.attributes.technicalInterview
                     : 'Korisnik nije naveo utiske sa tehnickog intervju-a'}
               </p>
            </div>
            <div className={styles['employee-info']}>
               <p>{`${interview.attributes.position.data.attributes.name}(${interview.attributes.seniority.data.attributes.name})`}</p>
            </div>
         </div>
      </>
   )
}

export default CompanyInterview
