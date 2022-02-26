import React from 'react'
import styles from './Footer.module.css'
import { Instagram, Facebook, Twitter, Linkedin } from 'react-feather'
import { Link } from 'react-router-dom'
import flag from '../../assets/flag.png'

const Footer = () => {
   return (
      <div className={styles.footer}>
         <div className={styles['footer-content']}>
            <div className={styles['footer-content-section']}>
               <div className={styles['footer-logo']}>
                  <img
                     src={flag}
                     alt='Montenegro Flag'
                     className={styles['footer-logo-img']}
                  />
                  <h2 style={{ margin: '0.5rem 0' }}>IT me</h2>
               </div>

               <div className={styles['social-networks']}>
                  <h3>Follow us</h3>
                  <div className={styles['social-networks-wrapper']}>
                     <a
                        href='https://www.instagram.com/wecodemne/'
                        target='_blank'
                        rel='noreferrer noopener'
                     >
                        <Instagram size={42} />
                     </a>
                     <Facebook size={42} />
                     <Twitter size={42} />
                     <Linkedin size={42} />
                  </div>
                  <p>© IT me 2022</p>
               </div>
            </div>
            <div
               className={`${styles['footer-content-section']} ${styles.second}`}
            >
               <div>
                  <h3>ICT Cortex</h3>
                  <div className={styles['links-wrapper']}>
                     <a
                        href='https://ictcortex.me/'
                        target='_blank'
                        rel='noreferrer noopener'
                     >
                        Home Page
                     </a>
                     <a
                        href='https://www.linkedin.com/company/ictcortex/?originalSubdomain=me'
                        target='_blank'
                        rel='noreferrer noopener'
                     >
                        LinkedIn
                     </a>
                     <Link to='/credits'>Credits</Link>
                  </div>
               </div>

               <div>
                  <h3>Joberty</h3>
                  <div className={styles['links-wrapper']}>
                     <a
                        href='https://www.joberty.rs/'
                        target='_blank'
                        rel='noreferrer noopener'
                     >
                        Joberty RS
                     </a>
                     <a
                        href='https://www.joberty.hr/'
                        target='_blank'
                        rel='noreferrer noopener'
                     >
                        Joberty HR
                     </a>
                     <Link to='/credits'>Credits</Link>
                  </div>
               </div>
            </div>
            <div
               className={`${styles['footer-content-section']} ${styles.third}`}
            >
               <div>
                  <h3>Resources</h3>
                  <div>Terms & Conditions</div>
                  <div>Privacy Policy</div>
               </div>
               <div>
                  <h3>Support</h3>
                  <div>Community</div>
                  <div>FAQ</div>
                  <div>Contact us</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Footer
