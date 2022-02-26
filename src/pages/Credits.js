import React from 'react'
import { Animate } from '../animations/Animate'
import Wrapper from '../components/Layout/Wrapper'
import styles from './Credits.module.css'

const Credits = () => {
   const CORTEX_LINKS = [
      { name: 'Alicorn', link: 'https://ictcortex.me/clanica/alicorn-d-o-o/' },
      {
         name: 'Amplitudo',
         link: 'https://ictcortex.me/clanica/amplitudo/',
      },
      {
         name: 'Bild Studio',
         link: 'https://ictcortex.me/clanica/bild-studio/',
      },
      { name: 'Čikom', link: 'https://ictcortex.me/clanica/cikom/' },
      {
         name: 'Codepixel',
         link: 'https://ictcortex.me/clanica/codepixel/',
      },
      {
         name: 'Codingo',
         link: 'https://ictcortex.me/en/clanica/codingo/',
      },
      { name: 'Coinis', link: 'https://ictcortex.me/clanica/coinis/' },
      {
         name: 'Data Design',
         link: 'https://ictcortex.me/clanica/data-design-d-o-o/',
      },
      { name: 'Domen', link: 'https://ictcortex.me/clanica/domain-me/' },
      { name: 'Fleka', link: 'https://ictcortex.me/clanica/fleka/' },
      { name: 'Logate', link: 'https://ictcortex.me/clanica/logate/' },
      {
         name: 'Quantox (preuzeto sa itposlovi.me)',
         link: 'https://itposlovi.me/it-kompanija/18/quantox-technology',
      },
   ]
   return (
      <Animate>
         <Wrapper>
            <div className={styles.credits}>
               <h2>Joberty</h2>
               <p>
                  Kompletan Home Page tekst preuzet je sa stranice&nbsp;
                  <a
                     href='https://www.joberty.rs/'
                     target='_blank'
                     rel='noreferrer'
                  >
                     Joberty-a
                  </a>
                  &nbsp;.Sva prava zadrzava Joberty
               </p>
               <ul>
                  <li>
                     <a
                        href='https://www.joberty.rs/'
                        target='_blank'
                        rel='noreferrer'
                     >
                        Joberty RS
                     </a>
                  </li>
                  <li>
                     <a
                        href='https://www.joberty.hr/'
                        target='_blank'
                        rel='noreferrer'
                     >
                        Joberty HR
                     </a>
                  </li>
               </ul>
               <h2>ICT Cortex</h2>
               <p>
                  Kompletan opis kompanija preuzet je sa stranice&nbsp;
                  <a
                     href='https://ictcortex.me/'
                     target='_blank'
                     rel='noreferrer'
                  >
                     ICT Cortex-a
                  </a>
                  &nbsp;.Sva prava zadrzava ICT Cortex
               </p>
               <ul>
                  {CORTEX_LINKS.map((item) => (
                     <li key={item.name}>
                        <a href={item.link} target='_blank' rel='noreferrer'>
                           {item.name}
                        </a>
                     </li>
                  ))}
               </ul>
               <h2>Statistika</h2>
               <p>
                  Podaci potrebni za prikaz statistike firme preuzeti sa&nbsp;
                  <a
                     href='https://eprijava.tax.gov.me/'
                     target='_blank'
                     rel='noreferrer'
                  >
                     https://eprijava.tax.gov.me/
                  </a>
               </p>
            </div>
         </Wrapper>
      </Animate>
   )
}

export default Credits
