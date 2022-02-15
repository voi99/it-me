import { useState, useCallback, useEffect } from 'react'

const usePage = () => {
   const [refresh, setRefresh] = useState(false)
   const [openModal, setOpenModal] = useState()

   const refreshHandler = useCallback(() => {
      setRefresh((prevState) => !prevState)
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

   return [
      openModal,
      refresh,
      refreshHandler,
      openModalHandler,
      closeModalHandler,
   ]
}

export default usePage
