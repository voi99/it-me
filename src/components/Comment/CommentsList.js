import React from 'react'
import Comment from './Comment'
import styles from './CommentsList.module.css'

const comments = [
   {
      id: 1,
      company: 'Coinis',
      positive:
         'Odlična atmosfera,najbolji šefovi ikad(realno). Zanimljivi projekti,nema pritiska niti stresa što...',
      negative: 'Što se mene tiče nema...zato sam ovdje tri godine.',
   },
   {
      id: 2,
      company: 'Build Studio',
      positive:
         'Odlična atmosfera,najbolji šefovi ikad(realno). Zanimljivi projekti,nema pritiska niti stresa što...',
      negative: 'Što se mene tiče nema...zato sam ovdje tri godine.',
   },
   {
      id: 3,
      company: 'Alicorn',
      positive:
         'Odlična atmosfera,najbolji šefovi ikad(realno). Zanimljivi projekti,nema pritiska niti stresa što...',
      negative: 'Što se mene tiče nema...zato sam ovdje tri godine.',
   },
   {
      id: 4,
      company: 'Logate',
      positive:
         'Odlična atmosfera,najbolji šefovi ikad(realno). Zanimljivi projekti,nema pritiska niti stresa što...',
      negative: 'Što se mene tiče nema...zato sam ovdje tri godine.',
   },
   {
      id: 5,
      company: 'Quantox',
      positive:
         'Odlična atmosfera,najbolji šefovi ikad(realno). Zanimljivi projekti,nema pritiska niti stresa što...',
      negative: 'Što se mene tiče nema...zato sam ovdje tri godine.',
   },
   {
      id: 6,
      company: 'Infinum',
      positive:
         'Odlična atmosfera,najbolji šefovi ikad(realno). Zanimljivi projekti,nema pritiska niti stresa što...',
      negative: 'Što se mene tiče nema...zato sam ovdje tri godine.',
   },
]

const CommentsList = () => {
   return (
      <section className={styles['comments-seciton']}>
         <h3>Najnoviji komentari</h3>
         <div className={styles.comments}>
            {comments.map((comment) => (
               <Comment
                  key={comment.id}
                  company={comment.company}
                  positive={comment.positive}
                  negative={comment.negative}
               />
            ))}
         </div>
      </section>
   )
}

export default CommentsList
