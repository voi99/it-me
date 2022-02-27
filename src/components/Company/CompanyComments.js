import React, { useState, useEffect, useCallback } from 'react'
import styles from '../../shared/CompanyCard.module.css'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import Modal from '../UI/Modal'
import AddComment from '../Comment/AddComment'
import { fetchCompanyComments } from '../../api/company'
import usePageActions from '../../hooks/use-page-actions'
import { getCurrentUser } from '../../api/auth'
import CompanyComment from '../Comment/CompanyComment'
import { useAuthContext } from '../../hooks/use-auth'
import toast, { Toaster } from 'react-hot-toast'

const CompanyComments = ({ company }) => {
   const [userId, setUserId] = useState()
   const { isLoggedIn } = useAuthContext()
   const [commentChange, setCommentChange] = useState(false)
   const {
      openModal,
      hasChange,
      hasChangeHandler,
      openModalHandler,
      closeModalHandler,
   } = usePageActions()
   const [comments, setComments] = useState()
   const [limit, setLimit] = useState(4)
   const [loadMore, setLoadMore] = useState(false)

   const commentChangeHandler = useCallback(() => {
      setCommentChange((prevState) => !prevState)
   }, [])

   useEffect(() => {
      if (isLoggedIn) {
         ;(async () => {
            const { id } = await getCurrentUser()
            setUserId(id)
         })()
      }
   }, [isLoggedIn])

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
   }, [company, limit, commentChange])

   useEffect(() => {
      if (hasChange) {
         toast('Komentar ceka odobrenje 😀')
         hasChangeHandler(false)
      }
   }, [hasChange, hasChangeHandler])

   const handleLoadMore = () => {
      const newLimit = limit + 4
      setLimit(newLimit)
   }

   return (
      <>
         <Toaster />
         {openModal && (
            <Modal onClose={closeModalHandler}>
               <AddComment
                  title='Komentar'
                  company={company}
                  onClose={closeModalHandler}
                  refresh={hasChangeHandler}
               />
            </Modal>
         )}
         <CompanySectionLayout
            title='Komentari'
            add={openModalHandler}
            hoverText='Prijavi se kako bi dodao komentar'
         >
            {comments ? (
               comments.length > 0 ? (
                  <>
                     {comments.map((comment) => (
                        <CompanyComment
                           comment={comment}
                           userId={userId}
                           key={comment.id}
                           company={company}
                           refresh={hasChangeHandler}
                           commentHasChanged={commentChangeHandler}
                        />
                     ))}
                     {loadMore && (
                        <button onClick={handleLoadMore} className={styles.btn}>
                           Load More
                        </button>
                     )}
                  </>
               ) : (
                  <p style={{ textAlign: 'center' }}>Nema podataka</p>
               )
            ) : (
               <p style={{ textAlign: 'center' }}>Loading...</p>
            )}
         </CompanySectionLayout>
      </>
   )
}

export default CompanyComments
