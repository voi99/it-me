import React from 'react'
import styles from './Input.module.css'

const Input = ({
   name,
   type,
   placeholder,
   required,
   autoComplete,
   register,
   className,
}) => {
   return (
      <input
         name={name}
         type={type}
         placeholder={placeholder}
         className={`${styles.input} ${className}`}
         autoComplete={autoComplete}
         required={required}
         {...register(name)}
      />
   )
}

export default Input
