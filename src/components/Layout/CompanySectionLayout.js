import React from 'react'
import styles from './CompanySection.module.css'

const CompanySectionLayout = (props) => {
   return (
      <div className={styles['company-section']}>
         <div className={styles.header}>
            <div className={styles.notch}>
               <h4>{props.title}</h4>
            </div>
         </div>
         <div className={styles['company-section-content']}>
            {props.children}
         </div>
      </div>
   )
}

export default CompanySectionLayout
