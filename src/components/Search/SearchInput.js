import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { filterCompanies } from '../../api/company'
import { Animate } from '../../animations/Animate'
import { AnimatePresence } from 'framer-motion'

const SearchInput = () => {
   const [openDropdown, setOpenDropdown] = useState(false)
   const [countries, setCountries] = useState([])

   const handleCloseDropdown = () => {
      setOpenDropdown(false)
   }

   const setWindowEvent = useCallback((e) => {
      if (e.target.id !== 'search-input' && e.target.id !== 'search-dropdown')
         handleCloseDropdown()
   }, [])

   useEffect(() => {
      window.addEventListener('click', setWindowEvent)

      return () => {
         window.removeEventListener('click', setWindowEvent)
      }
   }, [setWindowEvent])

   const handleInputChange = async (e) => {
      const companyName = e.target.value.trim()
      const filteredCompanies = await filterCompanies(companyName)

      if (filteredCompanies.length > 0) {
         setCountries(filteredCompanies)
         setOpenDropdown(true)
      } else {
         setOpenDropdown(false)
      }
   }

   return (
      <div className={styles['input-wrapper']}>
         <FontAwesomeIcon
            icon={!openDropdown ? faSearch : faCircleXmark}
            onClick={handleCloseDropdown}
            size='lg'
            className={styles.icon}
            color='var(--dark-grey)'
         />
         <input
            id='search-input'
            type='text'
            className={styles.input}
            onChange={handleInputChange}
            onFocus={handleInputChange}
            autoComplete='off'
            style={{ color: 'var(--dark-grey)' }}
         />
         <AnimatePresence>
            {openDropdown && (
               <Animate
                  id='search-dropdown'
                  className={styles['search-dropdown']}
                  duration='0.3'
               >
                  {countries.map((country) => (
                     <Link
                        to={`/company/${country.attributes.slug}/comments`}
                        key={country.id}
                     >
                        {country.attributes.name}
                     </Link>
                  ))}
               </Animate>
            )}
         </AnimatePresence>
      </div>
   )
}

export default SearchInput
