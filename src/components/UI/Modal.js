import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = (props) => {
   return <div className={styles.backdrop}>{props.children}</div>
}

const ModalOverlay = (props) => {
   return <div className={styles.modal}>{props.children}</div>
}

const portalEl = document.getElementById('overlays')

const Modal = (props) => {
   return (
      <>
         {createPortal(
            <Backdrop>
               <ModalOverlay>{props.children}</ModalOverlay>
            </Backdrop>,
            portalEl
         )}
      </>
   )
}

export default Modal
