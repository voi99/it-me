import Chart from '../Chart/Chart'
import React from 'react'
import styles from './CompanyDetails.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'

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
               <p>
                  <FontAwesomeIcon
                     icon={faEnvelope}
                     style={{ marginRight: '0.35rem' }}
                  />
                  <a href={`mailto:${company.attributes.email}`}>
                     {company.attributes.email}
                  </a>
               </p>
               <p>
                  <FontAwesomeIcon
                     icon={faGlobe}
                     style={{ marginRight: '0.35rem' }}
                  />
                  <a
                     href={company.attributes.website}
                     target='_blank'
                     rel='noreferrer'
                  >
                     {company.attributes.website}
                  </a>
               </p>
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
                        sign='€'
                     />
                  </div>
                  <div>
                     <div className={styles['chart-title']}>Profit(€)</div>
                     <Chart
                        data={company.attributes['year_stats'].data}
                        by='profit'
                        sign='€'
                     />
                  </div>
                  <div>
                     <div className={styles['chart-title']}>Zaposleni</div>
                     <Chart
                        data={company.attributes['year_stats'].data}
                        by='employees'
                        sign=''
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
