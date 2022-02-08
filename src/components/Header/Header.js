import React, { useState } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ActionsDropdown from './ActionsDropdown'

const Header = () => {
   const [openDropdown, setOpenDropdown] = useState(false)
   const handleDropdown = () => {
      setOpenDropdown((prevState) => !prevState)
   }

   return (
      <header className={styles.header}>
         <div className={styles['header-content-wrapper']}>
            <div className={styles['header-logo-wrapper']}>
               <div className={styles['header-logo']}></div>
               <Link to='/'>
                  <h3>IT me</h3>
               </Link>
            </div>
            <div className={styles['header-actions-wrapper']}>
               <div className={styles['header-actions-desktop']}>
                  <Link
                     to='/login'
                     className={`${styles['link']} ${styles['link-first']}`}
                  >
                     Login
                  </Link>
                  <Link
                     to='/signup'
                     className={`${styles['link']} ${styles['link-second']}`}
                  >
                     Signup
                  </Link>
               </div>
               <div className={styles['header-actions-mobile']}>
                  <FontAwesomeIcon
                     icon={faBars}
                     size='xl'
                     onClick={handleDropdown}
                     className={styles.icon}
                  />
                  {openDropdown && (
                     <ActionsDropdown>
                        <Link
                           to='/login'
                           className={`${styles['link']} ${styles['link-first']}`}
                        >
                           Login
                        </Link>
                        <Link
                           to='/signup'
                           className={`${styles['link']} ${styles['link-second']}`}
                        >
                           Signup
                        </Link>
                     </ActionsDropdown>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header
