import React, { useEffect, useState } from 'react'
import { fetchLatestComments } from '../../api/comment'
import Comment from './Comment'
import styles from './CommentsList.module.css'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../UI/LoadingSpinner'

const CommentsList = () => {
   const [latestComments, setLatestComments] = useState(null)
   useEffect(() => {
      const fetchComments = async () => {
         const comments = await fetchLatestComments()
         setLatestComments(comments)
      }
      fetchComments()
   }, [])

   return (
      <section className={styles['comments-seciton']}>
         <h3 style={{ paddingLeft: '0.3rem' }}>Najnoviji komentari</h3>

         {latestComments ? (
            <div className={styles.comments}>
               {latestComments.map((comment) => (
                  <Link
                     key={comment.id}
                     to={`/company/${comment.attributes.company.data.attributes.slug}/comments`}
                  >
                     <Comment
                        key={comment.id}
                        company={comment.attributes.company}
                        positive={
                           comment.attributes.positive
                              ? comment.attributes.positive.length > 100
                                 ? `${comment.attributes.positive.slice(
                                      0,
                                      100
                                   )}...`
                                 : comment.attributes.positive
                              : 'Korisnik nije naveo pozitivne strane rada u kompaniji'
                        }
                        negative={
                           comment.attributes.negative
                              ? comment.attributes.negative.length > 100
                                 ? `${comment.attributes.negative.slice(
                                      0,
                                      100
                                   )}...`
                                 : comment.attributes.negative
                              : 'Korisnik nije naveo negativne strane rada u kompaniji'
                        }
                     />
                  </Link>
               ))}
            </div>
         ) : (
            <LoadingSpinner />
         )}
      </section>
   )
}

export default CommentsList
