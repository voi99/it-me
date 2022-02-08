import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
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
               <Link to='/login'>Login</Link>
               <Link to='/signup'>Logout</Link>
            </div>
         </div>
      </header>
   )
}

export default Header
