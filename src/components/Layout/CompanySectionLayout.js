import React from 'react'
import { useAuthContext } from '../../hooks/use-auth'
import styles from './CompanySection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faLock } from '@fortawesome/free-solid-svg-icons'
import { Animate } from '../../animations/Animate'
import { Link } from 'react-router-dom'
import HoverText from '../UI/HoverText'

const CompanySectionLayout = (props) => {
   const { isLoggedIn } = useAuthContext()
   return (
      <Animate className={styles['company-section']}>
         <div className={styles.header}>
            <div className={styles.notch}>
               <h4>{props.title}</h4>
            </div>
            {isLoggedIn ? (
               <FontAwesomeIcon
                  icon={faCirclePlus}
                  size='xl'
                  onClick={props.add}
                  className={styles['add-icon']}
               />
            ) : (
               <Link to='/login'>
                  <HoverText text={props.hoverText}>
                     <FontAwesomeIcon
                        icon={faLock}
                        size='xl'
                        className={styles['add-icon']}
                     />
                  </HoverText>
               </Link>
            )}
         </div>
         <div className={styles['company-section-content']}>
            {props.children}
         </div>
      </Animate>
   )
}

export default CompanySectionLayout
