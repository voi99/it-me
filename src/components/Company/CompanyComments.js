import React from 'react'
import styles from './CompanyComments.module.css'
import CompanySectionLayout from '../Layout/CompanySectionLayout'

const CompanyComments = ({ comments }) => {
   return (
      <CompanySectionLayout title='Komentari'>
         {comments.map((comment) => (
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
                  <p>{`${comment.attributes.position.data.attributes.name}(${comment.attributes.seniority.data.attributes.name})`}</p>
               </div>
            </div>
         ))}
      </CompanySectionLayout>
   )
}

export default CompanyComments
