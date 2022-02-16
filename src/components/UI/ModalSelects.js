import React from 'react'
import styles from './ModalSelects.module.css'

const ModalSelects = ({ positions, seniorities, register }) => {
   return (
      <>
         <div className={styles['input-wrapper']}>
            <label htmlFor='position'>Radna pozicija</label>
            <select
               name='position'
               id='position'
               {...register('position')}
               defaultValue=''
               required
            >
               <option value='' disabled hidden>
                  Izaberi poziciju
               </option>
               {positions &&
                  positions.map((position) => (
                     <option value={position.value} key={position.value}>
                        {position.name}
                     </option>
                  ))}
            </select>
         </div>

         <div className={styles['input-wrapper']}>
            <label htmlFor='seniority'>Nivo iskustva</label>
            <select
               name='seniority'
               id='seniority'
               required
               {...register('seniority')}
               defaultValue=''
            >
               <option value='' disabled hidden>
                  Izaberi nivo znanja
               </option>
               {seniorities &&
                  seniorities.map((seniority) => (
                     <option value={seniority.value} key={seniority.value}>
                        {seniority.name}
                     </option>
                  ))}
            </select>
         </div>
      </>
   )
}

export default ModalSelects
