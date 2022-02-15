import React from 'react'
import styles from './CompanyDetails.module.css'

const CompanyDetails = ({ company }) => {
   const api_url = 'http://localhost:1337'
   return (
      <div className={styles['company-details']}>
         <div className={styles['company-header']}>
            <div
               className={styles['company-logo']}
               style={{
                  backgroundImage: `url(${api_url}${company.attributes.logo.data.attributes.url})`,
               }}
            ></div>
            <div className={styles['company-info']}>
               <h3>{company.attributes.name}</h3>
               <p>{company.attributes.email}</p>
            </div>
         </div>
         <div className={styles['company-about']}>
            <h3>O kompaniji</h3>
            <p>{company.attributes.description}</p>
         </div>
      </div>
   )
}

export default CompanyDetails
