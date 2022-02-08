import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './SearchInput.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'

//TESTING
const countries = [
   { value: 'ghana', label: 'Ghana' },
   { value: 'nigeria', label: 'Nigeria' },
   { value: 'kenya', label: 'Kenya' },
   { value: 'southAfrica', label: 'South Africa' },
   { value: 'unitedStates', label: 'United States' },
   { value: 'canada', label: 'Canada' },
   { value: 'germany', label: 'Germany' },
]

const SearchInput = () => {
   const [openDropdown, setOpenDropdown] = useState(false)
   const handleInputChange = () => {
      if (!openDropdown) setOpenDropdown(true)
   }
   const handleCloseDropdown = () => {
      setOpenDropdown(false)
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
            type='text'
            className={styles.input}
            onChange={handleInputChange}
         />
         {openDropdown && (
            <div className={styles['search-dropdown']}>
               {countries.map((country) => (
                  <Link to={`/${country.value}`} key={country.value}>
                     {country.value}
                  </Link>
               ))}
            </div>
         )}
      </div>
   )
}

export default SearchInput
