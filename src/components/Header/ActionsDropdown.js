import React from 'react'
import styles from './ActionsDropdown.module.css'
import { Animate } from '../../animations/Animate'

const ActionsDropdown = ({ children }) => {
   return <Animate className={styles.dropdown}>{children}</Animate>
}

export default ActionsDropdown
