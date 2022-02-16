import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'
import { filterCompanies } from '../../api/company'

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
      const inputName = e.target.value.trim()
      const filteredCountries = await filterCompanies(inputName)

      if (filteredCountries.length > 0) {
         setCountries(filteredCountries)
         setOpenDropdown(true)
      } else {
         setOpenDropdown(false)
      }
   }

   return (
      <div className={styles['input-wrapper']}>
         <FontAwesomeIcon
            icon={!openDropdown ? faSearch : faClose}
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
         />
         {openDropdown && (
            <div id='search-dropdown' className={styles['search-dropdown']}>
               {countries.map((country) => (
                  <Link
                     to={`/company/${country.attributes.slug}/comments`}
                     key={country.id}
                  >
                     {country.attributes.name}
                  </Link>
               ))}
            </div>
         )}
      </div>
   )
}

export default SearchInput
