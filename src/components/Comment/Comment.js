import React from 'react'
import Card from '../UI/Card'
import styles from './Comment.module.css'

const Comment = ({ company, positive, negative }) => {
   const url = process.env.REACT_APP_BACKEND_URL

   return (
      <Card className={styles.card}>
         <div
            style={{
               position: 'absolute',
               top: '-1.4rem',
               right: '1.4rem',
               height: '2.8rem',
               width: '2.8rem',
               backgroundImage: `url(${url}${company.data.attributes.logo.data.attributes.url})`,
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: '100%',
               borderRadius: '0.5rem',
               transition: '0.5s',
            }}
            className={styles.logo}
         ></div>
         <h2 className={styles['company-name']}>
            {company.data.attributes.name}
         </h2>
         <h4>Pozitivno</h4>
         <p>{positive}</p>
         <h4>Negativno</h4>
         <p>{negative}</p>
         <button className={styles.btn}>pogledaj komentar</button>
      </Card>
   )
}

export default Comment
