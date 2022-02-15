import React from 'react'
import styles from './ModalLayout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const ModalLayout = ({ title, company, onClose, children }) => {
   return (
      <div className={styles.modal}>
         <header className={styles['modal-header']}>
            <div>
               <h3>{title}</h3>
               <p>Kompanija {company.attributes.name}</p>
            </div>
            <FontAwesomeIcon
               icon={faCircleXmark}
               size='xl'
               onClick={onClose}
               className={styles.icon}
            />
         </header>
         <div>{children}</div>
      </div>
   )
}

export default ModalLayout
