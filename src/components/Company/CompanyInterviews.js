import React, { useState, useEffect } from 'react'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import usePageActions from '../../hooks/use-page-actions'
import Modal from '../UI/Modal'
import AddInterview from '../Interview/AddInterview'
import { fetchCompanyInterviews } from '../../api/company'
import styles from '../../shared/CompanyCard.module.css'

const CompanyInterviews = ({ company }) => {
   const {
      openModal,
      refresh,
      refreshHandler,
      openModalHandler,
      closeModalHandler,
   } = usePageActions()

   const [interviews, setInterviews] = useState()
   const [limit, setLimit] = useState(4)
   const [loadMore, setLoadMore] = useState(false)

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
   }, [company, refresh, limit])

   const handleLoadMore = () => {
      const newLimit = limit + 4
      setLimit(newLimit)
   }

   return (
      <>
         {openModal && (
            <Modal>
               <AddInterview
                  title='Intervju'
                  company={company}
                  onClose={closeModalHandler}
                  refresh={refreshHandler}
               />
            </Modal>
         )}
         <CompanySectionLayout title='Intervjui' add={openModalHandler}>
            {interviews ? (
               <>
                  {interviews.map((interview) => (
                     <div key={interview.id} className={styles.element}>
                        <div>
                           <h3>HR intervju</h3>
                           <p>
                              {interview.attributes.hrInterview
                                 ? interview.attributes.hrInterview
                                 : 'Korisnik nije naveo utiske sa HR intervju-a'}
                           </p>
                        </div>
                        <div>
                           <h3>Tehnicki intervju</h3>
                           <p>
                              {interview.attributes.technicalInterview
                                 ? interview.attributes.technicalInterview
                                 : 'Korisnik nije naveo utiske sa tehnickog intervju-a'}
                           </p>
                        </div>
                        <div className={styles['employee-info']}>
                           <p>{`${interview.attributes.position.data.attributes.name}(${interview.attributes.seniority.data.attributes.name})`}</p>
                        </div>
                     </div>
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

export default CompanyInterviews
