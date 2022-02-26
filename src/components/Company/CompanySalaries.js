import React, { useEffect, useState } from 'react'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import usePageActions from '../../hooks/use-page-actions'
import Modal from '../UI/Modal'
import AddSalary from '../Salary/AddSalary'
import { fetchCompanySalaries } from '../../api/company'
import styles from './CompanySalaries.module.css'

const CompanySalaries = ({ company }) => {
   const {
      openModal,
      hasChange,
      hasChangeHandler,
      openModalHandler,
      closeModalHandler,
   } = usePageActions()

   const [salaries, setSalaries] = useState({})

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
   }, [company, hasChange])

   return (
      <>
         {openModal && (
            <Modal>
               <AddSalary
                  title='Plata'
                  company={company}
                  onClose={closeModalHandler}
                  refresh={hasChangeHandler}
               />
            </Modal>
         )}
         <CompanySectionLayout title='Plate' add={openModalHandler}>
            {salaries ? (
               Object.keys(salaries).length > 0 ? (
                  <>
                     <header className={styles['salaries-header']}>
                        <h4>Radna pozicija</h4>
                        <h4>Prosječna Plata</h4>
                     </header>
                     <div className={styles.salaries}>
                        {Object.keys(salaries).map((key) => (
                           <div key={key} className={styles.salary}>
                              <div className={styles['salary-average']}>
                                 <h4>{key}</h4>
                                 {(
                                    salaries[key].reduce((a, b) => a + b, 0) /
                                    salaries[key].length
                                 ).toFixed(2)}
                                 €
                              </div>
                              <div className={styles['position-salaries']}>
                                 <div>Min : {salaries[key][0]}€</div>
                                 <div>
                                    {salaries[key][salaries[key].length - 1]}€ :
                                    Max
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
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

export default CompanySalaries
