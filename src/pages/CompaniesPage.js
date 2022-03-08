import React, { useState, useEffect, useRef } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { filterCompanies } from '../api/company'
import styles from './CompaniesPage.module.css'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import CompanyCard from '../components/Company/CompanyCard'
import Footer from '../components/Footer/Footer'

const CompaniesPage = () => {
   const [companies, setCompanies] = useState()
   const searchRef = useRef()

   useEffect(() => {
      ;(async () => {
         const fetchedCompanies = await filterCompanies('')
         setCompanies(fetchedCompanies)
      })()
   }, [])

   const handleSearch = async (e) => {
      e.preventDefault()
      setCompanies()
      const fetchedCompanies = await filterCompanies(searchRef.current.value)
      setCompanies(fetchedCompanies)
   }

   return (
      <>
         <Wrapper>
            
            <form action='' className={styles.search} onSubmit={handleSearch}>
               <input
                  type='search'
                  className={styles.input}
                  placeholder='Pretrazi kompanije'
                  ref={searchRef}
               />
               <button className={styles.btn} onClick={handleSearch}>
                  Pretraga
               </button>
            </form>
            {companies ? (
               <div className={styles.companies}>
                  {companies.length > 0 ? (
                     companies.map((company) => (
                        <CompanyCard
                           key={company.id}
                           company={company}
                        ></CompanyCard>
                     ))
                  ) : (
                     <p>Nema rezultata</p>
                  )}
               </div>
            ) : (
               <LoadingSpinner />
            )}
         </Wrapper>
         {companies && <Footer />}
      </>
   )
}

export default CompaniesPage
