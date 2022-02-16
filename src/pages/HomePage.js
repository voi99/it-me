import React from 'react'
import CommentsList from '../components/Comment/CommentsList'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import Search from '../components/Search/Search'
import InfoSection from '../components/Sections/InfoSection'
import ServicesSection from '../components/Sections/ServicesSection'
import SupportSection from '../components/Sections/SupportSection'
import Footer from '../components/Footer/Footer'

const HomePage = () => {
   return (
      <>
         <HeroBanner>
            <Search />
         </HeroBanner>
         <CommentsList />
         <InfoSection />
         <ServicesSection />
         <SupportSection />
         <Footer />
      </>
   )
}

export default HomePage
