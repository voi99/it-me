import React from 'react'
import styles from './ModalSelects.module.css'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

const ModalSelects = ({ positions, seniorities, control }) => {
   return (
      <>
         <div className={styles['input-wrapper']}>
            <label htmlFor='position'>Radna pozicija</label>
            <Controller
               name='position'
               render={({ field }) => (
                  <ReactSelect
                     options={positions}
                     {...field}
                     id='position'
                     placeholder='Izaberi radnu poziciju'
                     styles={{
                        option: (provided, state) => ({
                           ...provided,
                           color: state.isSelected ? 'white' : 'black',
                           padding: 10,
                           background: state.isSelected ? '' : 'white',
                        }),
                     }}
                  />
               )}
               control={control}
            />
         </div>

         <div className={styles['input-wrapper']}>
            <label htmlFor='seniority'>Nivo iskustva</label>
            <Controller
               name='seniority'
               render={({ field }) => (
                  <ReactSelect
                     options={seniorities}
                     {...field}
                     id='seniority'
                     placeholder='Izaberi nivo iskustva'
                     styles={{
                        option: (provided, state) => ({
                           ...provided,
                           color: state.isSelected ? 'white' : 'black',
                           padding: 10,
                           background: state.isSelected ? '' : 'white',
                        }),
                     }}
                  />
               )}
               control={control}
            />
         </div>
      </>
   )
}

export default ModalSelects
