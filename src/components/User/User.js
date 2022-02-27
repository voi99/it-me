import React from 'react'
import styles from './User.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import PasswordChange from './PasswordChange'

const User = ({ user }) => {
   return (
      <div className={styles.user}>
         <FontAwesomeIcon icon={faUser} size='6x' />
         <h2>{user.username}</h2>
         <PasswordChange user={user} />
      </div>
   )
}

export default User
