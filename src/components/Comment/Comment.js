import React from 'react'
import Card from '../UI/Card'
import styles from './Comment.module.css'

const Comment = ({ commentId, company, positive, negative }) => {
   return (
      <Card className={styles.card}>
         <h3>{company}</h3>
         <h4>Pozitivno</h4>
         <div>{positive}</div>
         <h4>Negativno</h4>
         <div>{negative}</div>
         <button style={{ width: '100%', marginTop: '1rem' }}>
            pogledaj komentar
         </button>
      </Card>
   )
}

export default Comment
