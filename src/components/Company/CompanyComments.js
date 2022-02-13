import React, { useState, useEffect } from 'react'
import styles from './CompanyComments.module.css'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import { getCommentPositionAndSalary } from '../../api/comment'

const CompanyComments = ({ comments }) => {
   const [mappedComments, setMappedComments] = useState()
   useEffect(() => {
      const fillPositionAndSeniority = async () => {
         return Promise.all(
            comments.map(async (comment) => {
               const data = await getCommentPositionAndSalary(comment.id)
               return {
                  ...comment,
                  position: data.position,
                  seniority: data.seniority,
               }
            })
         )
      }

      fillPositionAndSeniority().then((data) => {
         setMappedComments(data)
      })
   }, [comments])

   return (
      <CompanySectionLayout title='Komentari'>
         {mappedComments
            ? mappedComments.map((comment) => (
                 <div key={comment.id} className={styles.comment}>
                    <div>
                       <h3>Pozitivno</h3>
                       <p>
                          {comment.attributes.positive
                             ? comment.attributes.positive
                             : 'Korisnik nije naveo pozitivne strane rada u kompaniji'}
                       </p>
                    </div>
                    <div>
                       <h3>Negativno</h3>
                       <p>
                          {comment.attributes.negative
                             ? comment.attributes.negative
                             : 'Korisnik nije naveo lose strane rada u kompaniji'}
                       </p>
                    </div>
                    <div className={styles['employee-info']}>
                       <p>{`${comment.position}(${comment.seniority})`}</p>
                    </div>
                 </div>
              ))
            : 'Loading'}
      </CompanySectionLayout>
   )
}

export default CompanyComments
