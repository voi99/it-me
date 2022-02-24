import { useState, useCallback, useEffect } from 'react'

const usePageActions = () => {
   const [hasChange, setHasChange] = useState(false)
   const [openModal, setOpenModal] = useState()

   const hasChangeHandler = useCallback(() => {
      setHasChange((prevState) => !prevState)
   }, [])

   useEffect(() => {
      openModal
         ? (document.body.style.overflow = 'hidden')
         : (document.body.style.overflow = 'unset')
   }, [openModal])

   const openModalHandler = useCallback(() => {
      setOpenModal(true)
   }, [])

   const closeModalHandler = useCallback(() => {
      setOpenModal(false)
   }, [])

   return {
      openModal,
      hasChange,
      hasChangeHandler,
      openModalHandler,
      closeModalHandler,
   }
}

export default usePageActions
