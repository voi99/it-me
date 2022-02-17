import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { Route, Routes, useParams, useLocation } from 'react-router-dom'
import styles from './CompanyPage.module.css'
import CompanyDetails from '../components/Company/CompanyDetails'
import { fetchCompany } from '../api/company'
import CompanyRouter from '../components/Company/CompanyRouter'
import CompanyComments from '../components/Company/CompanyComments'
import CompanySalaries from '../components/Company/CompanySalaries'
import CompanyInterviews from '../components/Company/CompanyInterviews'
import Footer from '../components/Footer/Footer'
import { Animate } from '../animations/Animate'
import { AnimatePresence } from 'framer-motion'

const CompanyPage = () => {
   const { slug } = useParams()
   const [company, setCompany] = useState(null)
   const location = useLocation()

   useEffect(() => {
      const getCompany = async () => {
         const fetchedCompany = await fetchCompany(slug)
         setCompany(fetchedCompany)
      }
      getCompany()
   }, [slug])

   return (
      <Animate>
         <Wrapper>
            <div className={styles['company-content']}>
               {company ? (
                  <>
                     <CompanyDetails company={company} />
                     <div className={styles['company-sections']}>
                        <CompanyRouter />
                        <AnimatePresence exitBeforeEnter>
                           <Routes location={location} key={location.pathname}>
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
                                 element={
                                    <CompanyInterviews company={company} />
                                 }
                              />
                           </Routes>
                        </AnimatePresence>
                     </div>
                  </>
               ) : (
                  'Loading...'
               )}
            </div>
         </Wrapper>
         <Footer />
      </Animate>
   )
}

export default CompanyPage
