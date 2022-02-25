import Chart from '../Chart/Chart'
import React from 'react'
import styles from './CompanyDetails.module.css'

const CompanyDetails = ({ company }) => {
   const backend_url = process.env.REACT_APP_BACKEND_URL

   return (
      <div className={styles['company-details']}>
         <div className={styles['company-header']}>
            <div
               className={styles['company-logo']}
               style={{
                  backgroundImage: `url(${backend_url}${company.attributes.logo.data.attributes.url})`,
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
         <div className={styles['company-stats']}>
            <h3>Statistika</h3>
            {company.attributes['year_stats'].data.length > 0 ? (
               <>
                  <div>
                     <div className={styles['chart-title']}>Prihodi(€)</div>
                     <Chart
                        data={company.attributes['year_stats'].data}
                        by='income'
                     />
                  </div>
                  <div>
                     <div className={styles['chart-title']}>Profit(€)</div>
                     <Chart
                        data={company.attributes['year_stats'].data}
                        by='profit'
                     />
                  </div>
                  <div>
                     <div className={styles['chart-title']}>Zaposleni</div>
                     <Chart
                        data={company.attributes['year_stats'].data}
                        by='employees'
                     />
                  </div>
               </>
            ) : (
               <p>Nema podataka</p>
            )}
         </div>
      </div>
   )
}

export default CompanyDetails
