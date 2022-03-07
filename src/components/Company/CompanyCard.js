import React from 'react'
import styles from './CompanyCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faMapPin,
   faGlobe,
   faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const CompanyCard = ({ company }) => {
   const backend_url = process.env.REACT_APP_BACKEND_URL

   return (
      <div className={styles['company-card']}>
         <Link to={`/company/${company.attributes.slug}`}>
            <div className={styles['company-card-main']}>
               <div
                  className={styles['company-logo']}
                  style={{
                     backgroundImage: `url(${backend_url}${company.attributes.logo.data.attributes.url})`,
                  }}
               ></div>
               <div>
                  <h2>{company.attributes.name}</h2>
                  <div className={styles.location}>
                     <FontAwesomeIcon icon={faMapPin} />
                     Lokacija
                  </div>
               </div>
            </div>
         </Link>
         <div className={styles.links}>
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
         <Link to={`/company/${company.attributes.slug}`}>
            <div className={styles['company-info']}>
               <header className={styles['company-info-header']}>
                  <h3>O kompaniji</h3>
               </header>
               <p className={styles.description}>
                  {`${company.attributes.description.substring(0, 320)}...`}
               </p>
            </div>
         </Link>
      </div>
   )
}

export default CompanyCard
