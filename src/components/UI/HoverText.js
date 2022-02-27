import React from 'react'
import styles from './HoverText.module.css'

const HoverText = ({ text, children }) => {
   return (
      <span className={styles.hovertext} data-hover={text}>
         {children}
      </span>
   )
}

export default HoverText
