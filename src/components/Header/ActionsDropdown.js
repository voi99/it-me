import React from 'react'
import styles from './ActionsDropdown.module.css'

const ActionsDropdown = ({ children }) => {
   return <div className={styles.dropdown}>{children}</div>
}

export default ActionsDropdown
