import React, { useState, useEffect } from 'react'
import ModalLayout from '../Layout/ModalLayout'
import { useForm } from 'react-hook-form'
import { fetchPositions } from '../../api/position'
import { fetchSeniorities } from '../../api/seniority'
import styles from './AddComment.module.css'
import { addComment } from '../../api/comment'

const AddComment = ({ title, company, onClose, refresh }) => {
   const { register, handleSubmit } = useForm()

   const [positions, setPositions] = useState([])
   const [seniorities, setSeniorities] = useState([])
   const [error, setError] = useState('')

   useEffect(() => {
      const fillPositions = async () => {
         const fetchedPositions = await fetchPositions()
         setPositions(fetchedPositions)
         const fetchedSeniorities = await fetchSeniorities()
         setSeniorities(fetchedSeniorities)
      }
      fillPositions()
   }, [])

   const onSubmit = async (data) => {
      try {
         if (
            data.positive.trim().length === 0 &&
            data.negative.trim().length === 0
         ) {
            setError(
               'Morate dodati pozitivne ili negativne strane rada u firmi!'
            )
            return
         }
         await addComment({ ...data, company: company.id })
         refresh()
         onClose()
      } catch (e) {
         setError(e)
      }
   }

   return (
      <ModalLayout title={title} company={company} onClose={onClose}>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

            <div className={styles['input-wrapper']}>
               <label htmlFor='positive'>Pozitivno</label>
               <textarea
                  name='positive'
                  id='positive'
                  cols='30'
                  rows='10'
                  {...register('positive')}
               ></textarea>
            </div>

            <div className={styles['input-wrapper']}>
               <label htmlFor='negative'>Negativno</label>
               <textarea
                  name='negative'
                  id='negative'
                  cols='30'
                  rows='10'
                  {...register('negative')}
               ></textarea>
            </div>
            <div className='error'>{error}</div>
            <button>Dodaj komentar</button>
         </form>
      </ModalLayout>
   )
}

export default AddComment
