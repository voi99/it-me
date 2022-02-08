import React from 'react'
import styles from './HeroBanner.module.css'

const HeroBanner = (props) => {
   return <div className={styles['hero-banner']}>{props.children}</div>
}

export default HeroBanner
