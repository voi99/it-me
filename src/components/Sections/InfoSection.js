import React from 'react'
import imac from '../../assets/imac.png'
import styles from './InfoSection.module.css'

const InfoSection = () => {
   return (
      <section>
         <div className={`${styles['container']} container`}>
            <img src={imac} alt='' className={styles.img} />
            <h2>
               IT me je platforma koja omogućava zaposlenima u IT kompanijama da
               podijele svoja iskustva u radu kod poslodavaca, a kandidatima da
               pronađu posao koji im najviše odgovara.
            </h2>
         </div>
      </section>
   )
}

export default InfoSection
