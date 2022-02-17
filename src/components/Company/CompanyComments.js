import React, { useState, useEffect } from 'react'
import styles from '../../shared/CompanyCard.module.css'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import Modal from '../UI/Modal'
import AddComment from '../Comment/AddComment'
import { fetchCompanyComments } from '../../api/company'
import usePageActions from '../../hooks/use-page-actions'
import { getCurrentUser } from '../../api/auth'
import CompanyComment from '../Comment/CompanyComment'

const CompanyComments = ({ company }) => {
   const [userId, setUserId] = useState()

   useEffect(() => {
      ;(async () => {
         const { id } = await getCurrentUser()
         setUserId(id)
      })()
   }, [])

   const {
      openModal,
      refresh,
      refreshHandler,
      openModalHandler,
      closeModalHandler,
   } = usePageActions()
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
                     <CompanyComment
                        comment={comment}
                        userId={userId}
                        key={comment.id}
                        company={company}
                        refresh={refreshHandler}
                     />
                  ))}
                  {loadMore && (
                     <button onClick={handleLoadMore} className={styles.btn}>
                        Load More
                     </button>
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
