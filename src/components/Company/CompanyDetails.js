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
         <div className={styles['company-stats']}>
            <h3>Statistika</h3>
            <table className={styles.table}>
               <thead>
                  <tr>
                     <th>Godina</th>
                     <th>Prihodi</th>
                     <th>Profit</th>
                     <th>Zaposlenih</th>
                  </tr>
               </thead>
               <tbody>
                  {company.attributes['year_stats'].data.length > 0 ? (
                     company.attributes['year_stats'].data.map((year) => (
                        <tr key={year.attributes.year}>
                           <td>{year.attributes.year}</td>
                           <td>
                              {(year.attributes.income / 100).toFixed(2)} €
                           </td>
                           <td>
                              {(year.attributes.profit / 100).toFixed(2)} €
                           </td>
                           <td>{year.attributes.employees}</td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan={4} style={{ padding: '1rem' }}>
                           Nema podataka
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default CompanyDetails
