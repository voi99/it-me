import { useState, useEffect } from 'react'
import { fetchPositions } from '../api/position'
import { fetchSeniorities } from '../api/seniority'

const useSelectData = () => {
   const [positions, setPositions] = useState([])
   const [seniorities, setSeniorities] = useState([])

   useEffect(() => {
      const fillPositions = async () => {
         const fetchedPositions = await fetchPositions()
         setPositions(fetchedPositions)
         const fetchedSeniorities = await fetchSeniorities()
         setSeniorities(fetchedSeniorities)
      }
      fillPositions()
   }, [])

   return [positions, seniorities]
}

export default useSelectData
