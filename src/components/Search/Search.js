import React from 'react'
import styles from './Search.module.css'
import SearchInput from './SearchInput'

const Search = () => {
   return (
      <div>
         <h1 className={styles['search-title']}>
            Saznaj kako izgleda rad u IT <br />
            kompanijama u Crnoj Gori
         </h1>
         <SearchInput />
      </div>
   )
}

export default Search
