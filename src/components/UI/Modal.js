import React from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = (props) => {
   return <div className={styles.backdrop} onClick={props.closeModal}></div>
}

const ModalOverlay = (props) => {
   return (
      <div className={styles.modal}>
         <div className={styles.content}>{props.children}</div>
      </div>
   )
}

const portalEl = document.getElementById('overlays')

const Modal = (props) => {
   return (
      <>
         {createPortal(<Backdrop closeModal={props.onClose} />, portalEl)}
         {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
      </>
   )
}

export default Modal
