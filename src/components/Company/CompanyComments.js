import React, { useState, useEffect } from 'react'
import styles from './CompanyComments.module.css'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import Modal from '../UI/Modal'
import AddComment from '../Comment/AddComment'
import { fetchCompanyComments } from '../../api/company'
import usePage from '../../hooks/use-page'

const CompanyComments = ({ company }) => {
   const [
      openModal,
      refresh,
      refreshHandler,
      openModalHandler,
      closeModalHandler,
   ] = usePage()
   const [comments, setComments] = useState()
   const [limit, setLimit] = useState(4)
   const [loadMore, setLoadMore] = useState(false)

   useEffect(() => {
      const fillComments = async () => {
         const { comments, total } = await fetchCompanyComments(
            company.id,
            limit
         )
         if (limit >= total) {
            setLoadMore(false)
         } else {
            setLoadMore(true)
         }
         setComments(comments)
      }
      fillComments()
   }, [company, refresh, limit])

   const handleLoadMore = () => {
      const newLimit = limit + 4
      setLimit(newLimit)
   }

   return (
      <>
         {openModal && (
            <Modal>
               <AddComment
                  title='Komentar'
                  company={company}
                  onClose={closeModalHandler}
                  refresh={refreshHandler}
               />
            </Modal>
         )}
         <CompanySectionLayout title='Komentari' add={openModalHandler}>
            {comments ? (
               <>
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
                  {loadMore && (
                     <button onClick={handleLoadMore}>Load More</button>
                  )}
               </>
            ) : (
               'Loading...'
            )}
         </CompanySectionLayout>
      </>
   )
}

export default CompanyComments
