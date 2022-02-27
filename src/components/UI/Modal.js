import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = (props) => {
   const backdropClose = (e) => {
      if (e.target.className === `${styles.backdrop}`) {
         props.close()
      }
   }
   return (
      <div className={styles.backdrop} onClick={backdropClose}>
         {props.children}
      </div>
   )
}

const ModalOverlay = (props) => {
   return <div className={styles.modal}>{props.children}</div>
}

const portalEl = document.getElementById('overlays')

const Modal = (props) => {
   return (
      <>
         {createPortal(
            <Backdrop close={props.onClose}>
               <ModalOverlay>{props.children}</ModalOverlay>
            </Backdrop>,
            portalEl
         )}
      </>
   )
}

export default Modal
