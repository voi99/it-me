import React from 'react'
import styles from './SupportSection.module.css'

const SupportSection = () => {
   return (
      <section className={`${styles['support-section']} container`}>
         <h2>
            Podrži IT zajednicu
            <br /> u Crnoj Gori
         </h2>
         <p>
            Podijeli svoje iskustvo i pomozi kolegama iz IT zajednice da saznaju
            iz prve ruke kako zaista izgleda rad u tvojoj IT firmi. Ostavi
            anonimno svoj utisak u vidu komentara, plate i benefita ili intervju
            procesa. Pošalji anonimno poruku svom menadžmentu.
         </p>
         <div className={styles['support-section-image']}>
            <h2>
               Želite da se čujemo ili imate neki prijedlog? <br />
               Odlično! Zovite nas odmah ili nam pišite e-mail!
            </h2>
            <p>
               +382 69 --- ---
               <br /> itme@gmail.com
            </p>
         </div>
      </section>
   )
}

export default SupportSection
