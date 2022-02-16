import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { Route, Routes, useParams } from 'react-router-dom'
import styles from './CompanyPage.module.css'
import CompanyDetails from '../components/Company/CompanyDetails'
import { fetchCompany } from '../api/company'
import CompanyRouter from '../components/Company/CompanyRouter'
import CompanyComments from '../components/Company/CompanyComments'
import CompanySalaries from '../components/Company/CompanySalaries'
import CompanyInterviews from '../components/Company/CompanyInterviews'
import Footer from '../components/Footer/Footer'

const CompanyPage = () => {
   const { slug } = useParams()
   const [company, setCompany] = useState(null)

   useEffect(() => {
      const getCompany = async () => {
         const fetchedCompany = await fetchCompany(slug)
         setCompany(fetchedCompany)
      }
      getCompany()
   }, [slug])

   return (
      <>
         <Wrapper>
            <div className={styles['company-content']}>
               {company ? (
                  <>
                     <CompanyDetails company={company} />
                     <div className={styles['company-sections']}>
                        <CompanyRouter />
                        <Routes>
                           <Route
                              path='comments'
                              element={<CompanyComments company={company} />}
                           />
                           <Route
                              path='salaries'
                              element={<CompanySalaries company={company} />}
                           />
                           <Route
                              path='interviews'
                              element={<CompanyInterviews company={company} />}
                           />
                        </Routes>
                     </div>
                  </>
               ) : (
                  'Loading...'
               )}
            </div>
         </Wrapper>
         <Footer />
      </>
   )
}

export default CompanyPage
