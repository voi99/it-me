import React, { useState, useEffect, useCallback } from 'react'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import usePageActions from '../../hooks/use-page-actions'
import Modal from '../UI/Modal'
import AddInterview from '../Interview/AddInterview'
import { fetchCompanyInterviews } from '../../api/company'
import styles from '../../shared/CompanyCard.module.css'
import CompanyInterview from '../Interview/CompanyInterview'
import { useAuthContext } from '../../hooks/use-auth'
import { getCurrentUser } from '../../api/auth'
import toast, { Toaster } from 'react-hot-toast'
import LoadingSpinner from '../UI/LoadingSpinner'

const CompanyInterviews = ({ company }) => {
   const {
      openModal,
      hasChange,
      hasChangeHandler,
      openModalHandler,
      closeModalHandler,
   } = usePageActions()

   const [interviews, setInterviews] = useState()
   const [limit, setLimit] = useState(4)
   const [loadMore, setLoadMore] = useState(false)
   const { isLoggedIn } = useAuthContext()
   const [userId, setUserId] = useState()
   const [interviewChange, setInterviewChange] = useState(false)

   const interviewChangeHandler = useCallback(() => {
      setInterviewChange((prevState) => !prevState)
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
      const fillInterviews = async () => {
         const { interviews, total } = await fetchCompanyInterviews(
            company.id,
            limit
         )
         if (limit >= total) {
            setLoadMore(false)
         } else {
            setLoadMore(true)
         }
         setInterviews(interviews)
      }
      fillInterviews()
   }, [company, limit, interviewChange])

   useEffect(() => {
      if (hasChange) {
         toast('Intervju ceka odobrenje 😀')
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
               <AddInterview
                  title='Intervju'
                  company={company}
                  onClose={closeModalHandler}
                  refresh={hasChangeHandler}
               />
            </Modal>
         )}
         <CompanySectionLayout
            title='Intervjui'
            add={openModalHandler}
            hoverText='Prijavi se kako bi dodao intervju'
         >
            {interviews ? (
               interviews.length > 0 ? (
                  <>
                     {interviews.map((interview) => (
                        <CompanyInterview
                           interview={interview}
                           userId={userId}
                           key={interview.id}
                           company={company}
                           refresh={hasChangeHandler}
                           interviewHasChanged={interviewChangeHandler}
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
               <LoadingSpinner />
            )}
         </CompanySectionLayout>
      </>
   )
}

export default CompanyInterviews
