import React from 'react'
import { useAuthContext } from '../../hooks/use-auth'
import styles from './CompanySection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const CompanySectionLayout = (props) => {
   const { isLoggedIn } = useAuthContext()
   return (
      <div className={styles['company-section']}>
         <div className={styles.header}>
            <div className={styles.notch}>
               <h4>{props.title}</h4>
            </div>
            {isLoggedIn && (
               <FontAwesomeIcon
                  icon={faCirclePlus}
                  size='xl'
                  onClick={props.add}
                  className={styles['add-icon']}
               />
            )}
         </div>
         <div className={styles['company-section-content']}>
            {props.children}
         </div>
      </div>
   )
}

export default CompanySectionLayout
