import React from 'react'
import Card from '../UI/Card'
import styles from './Comment.module.css'

const Comment = ({ commentId, company, positive, negative }) => {
   return (
      <Card className={styles.card}>
         <h3>{company}</h3>
         <h4>Pozitivno</h4>
         <p>{positive}</p>
         <h4>Negativno</h4>
         <p>{negative}</p>
         <button className={styles.btn}>pogledaj komentar</button>
      </Card>
   )
}

export default Comment
