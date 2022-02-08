import React from 'react'
import Header from '../components/Header/Header'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import Search from '../components/Search/Search'

const HomePage = () => {
   return (
      <div style={{ position: 'relative' }}>
         <Header />
         <HeroBanner>
            <Search />
         </HeroBanner>
      </div>
   )
}

export default HomePage
