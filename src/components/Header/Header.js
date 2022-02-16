import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ActionsDropdown from './ActionsDropdown'
import { useAuthContext } from '../../hooks/use-auth'
import { getCurrentUser } from '../../api/auth'

const Header = () => {
   const [openDropdown, setOpenDropdown] = useState(false)
   const handleDropdown = () => {
      setOpenDropdown((prevState) => !prevState)
   }
   const { isLoggedIn, logout } = useAuthContext()
   const [user, setUser] = useState()

   useEffect(() => {
      const fillUser = async () => {
         const cUser = await getCurrentUser()
         setUser(cUser)
      }
      if (isLoggedIn) {
         fillUser()
      }
   }, [isLoggedIn])

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
                  {isLoggedIn ? (
                     <>
                        <Link
                           to='/me'
                           className={`${styles['link']} ${styles['link-first']}`}
                        >
                           {user ? user.username : 'Profile'}
                        </Link>
                        <Link
                           onClick={logout}
                           to={{}}
                           className={`${styles['link']} ${styles['link-second']}`}
                        >
                           Logout
                        </Link>
                     </>
                  ) : (
                     <>
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
                     </>
                  )}
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
                        {!isLoggedIn ? (
                           <>
                              <Link
                                 to='/login'
                                 className={`${styles['link']} ${styles['link-first']}`}
                                 onClick={() => {
                                    handleDropdown()
                                 }}
                              >
                                 Login
                              </Link>
                              <Link
                                 to='/signup'
                                 className={`${styles['link']} ${styles['link-second']}`}
                                 onClick={() => {
                                    handleDropdown()
                                 }}
                              >
                                 Signup
                              </Link>
                           </>
                        ) : (
                           <>
                              <Link
                                 to='/me'
                                 className={`${styles['link']} ${styles['link-first']}`}
                                 onClick={() => {
                                    handleDropdown()
                                 }}
                              >
                                 {user ? user.username : 'Profile'}
                              </Link>
                              <Link
                                 onClick={() => {
                                    handleDropdown()
                                    logout()
                                 }}
                                 to={{}}
                                 className={`${styles['link']} ${styles['link-second']}`}
                              >
                                 Logout
                              </Link>
                           </>
                        )}
                     </ActionsDropdown>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header
