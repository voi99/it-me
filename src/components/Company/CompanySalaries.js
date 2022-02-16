import React, { useEffect, useState } from 'react'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import usePage from '../../hooks/use-page'
import Modal from '../UI/Modal'
import AddComment from '../Comment/AddComment'
import { fetchCompanySalaries } from '../../api/company'
import styles from './CompanySalaries.module.css'

const CompanySalaries = ({ company }) => {
   const [
      openModal,
      // refresh,
      refreshHandler,
      openModalHandler,
      closeModalHandler,
   ] = usePage()

   const [salaries, setSalaries] = useState()

   useEffect(() => {
      const fillSalaries = async () => {
         const response = await fetchCompanySalaries(company.id)
         const modifiedData = response.reduce((acc, salary) => {
            const key = `${salary.attributes.position.data.attributes.name} (${salary.attributes.seniority.data.attributes.name})`
            if (acc[key]) {
               acc[key].push(salary.attributes.amount)
            } else {
               acc[key] = [salary.attributes.amount]
            }
            return acc
         }, {})

         Object.keys(modifiedData).forEach((key) => {
            modifiedData[key].sort((a, b) => {
               return a - b
            })
         })

         setSalaries(modifiedData)
      }

      fillSalaries()
   }, [company])

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
         <CompanySectionLayout title='Plate' add={openModalHandler}>
            {salaries ? (
               <div className={styles.salaries}>
                  <header className={styles['salaries-header']}>
                     <h4>Radna pozicija</h4>
                     <h4>Plata</h4>
                  </header>
                  {Object.keys(salaries).map((key) => (
                     <div key={key} className={styles.salary}>
                        <div className={styles['salary-average']}>
                           <p>{key}</p>
                           {salaries[key].reduce((a, b) => a + b, 0) /
                              salaries[key].length}
                           €
                        </div>
                        <div className={styles['position-salaries']}>
                           <div>Min : {salaries[key][0]}€</div>
                           <div>
                              {salaries[key][salaries[key].length - 1]}€ : Max
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               'Loading...'
            )}
         </CompanySectionLayout>
      </>
   )
}

export default CompanySalaries
