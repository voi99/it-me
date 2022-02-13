import React from 'react'
import styles from './CompanyRouter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { faUsersCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const CompanyRouter = () => {
   return (
      <div className={styles['company-router']}>
         <Link to='comments'>
            <FontAwesomeIcon icon={faComments} size='3x' />
         </Link>
         <Link to='salaries'>
            <FontAwesomeIcon icon={faCoins} size='3x' />
         </Link>
         <Link to='interviews'>
            <FontAwesomeIcon icon={faUsersCog} size='3x' />
         </Link>
      </div>
   )
}

export default CompanyRouter
