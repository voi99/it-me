import React from 'react'
import styles from './ServicesSection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faSearch,
   faCompressAlt,
   faUsersCog,
   faComments,
} from '@fortawesome/free-solid-svg-icons'

const ServicesSection = () => {
   return (
      <div className={`${styles['services-section-wrapper']} container`}>
         <section className={styles['services-section']}>
            <div className={styles['services-section-item']}>
               <FontAwesomeIcon icon={faSearch} size='4x' />
               <p>
                  Istraži
                  <br /> IT kompanije u Crnoj Gori
               </p>
            </div>
            <div className={styles['services-section-item']}>
               <FontAwesomeIcon icon={faCompressAlt} size='4x' />
               <p>
                  Uporedi
                  <br /> plate i benefite
               </p>
            </div>
            <div className={styles['services-section-item']}>
               <FontAwesomeIcon icon={faUsersCog} size='4x' />
               <p>
                  Pripremi se <br />
                  za HR i tehnički intervju
               </p>
            </div>
            <div className={styles['services-section-item']}>
               <FontAwesomeIcon icon={faComments} size='4x' />
               <p>
                  Saznaj <br /> anonimne utiske zaposlenih
               </p>
            </div>
         </section>
      </div>
   )
}

export default ServicesSection
