import React from 'react'
import styles from '../../shared/FormStyles.module.css'

const ModalTextarea = ({ name, label, register, defaultValue }) => {
   return (
      <div className={styles['input-wrapper']}>
         <label htmlFor={name}>{label}</label>
         <textarea
            name={name}
            id={name}
            cols='30'
            rows='10'
            defaultValue={defaultValue}
            {...register(name)}
            style={{
               backgroundColor: '#ffffff',
               borderRadius: '0.2rem',
               color: 'var(--black)',
            }}
         ></textarea>
      </div>
   )
}

export default ModalTextarea
