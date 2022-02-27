import React, { useEffect, useState } from 'react'
import CompanySectionLayout from '../Layout/CompanySectionLayout'
import usePageActions from '../../hooks/use-page-actions'
import Modal from '../UI/Modal'
import AddSalary from '../Salary/AddSalary'
import { fetchCompanySalaries } from '../../api/company'
import styles from './CompanySalaries.module.css'
import ChartSalary from '../Chart/ChartSalary'

const CompanySalaries = ({ company }) => {
   const {
      openModal,
      hasChange,
      hasChangeHandler,
      openModalHandler,
      closeModalHandler,
   } = usePageActions()

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

         setSalaries(modifiedData)
      }

      fillSalaries()
   }, [company, hasChange])

   return (
      <>
         {openModal && (
            <Modal onClose={closeModalHandler}>
               <AddSalary
                  title='Plata'
                  company={company}
                  onClose={closeModalHandler}
                  refresh={hasChangeHandler}
               />
            </Modal>
         )}
         <CompanySectionLayout
            title='Plate'
            add={openModalHandler}
            hoverText='Prijavi se kako bi dodao platu'
         >
            {salaries ? (
               Object.keys(salaries).length > 0 ? (
                  <div className={styles.salaries}>
                     {Object.keys(salaries).map((key) => (
                        <ChartSalary
                           data={salaries[key]}
                           key={key}
                           title={key}
                           avgSalary={{
                              title: 'Prosječna plata',
                              value: (
                                 salaries[key].reduce((a, b) => a + b, 0) /
                                 salaries[key].length
                              ).toFixed(2),
                           }}
                        />
                     ))}
                  </div>
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
