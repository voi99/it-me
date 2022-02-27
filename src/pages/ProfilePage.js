import React, { useState, useEffect, useCallback } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { getCurrentUser } from '../api/auth'
import { getUserDraftComments } from '../api/comment'
import CompanyComment from '../components/Comment/CompanyComment'
import { getUserDraftInterviews } from '../api/interview'
import CompanyInterview from '../components/Interview/CompanyInterview'
import { Animate } from '../animations/Animate'
import { useAuthContext } from '../hooks/use-auth'
import styles from './ProfilePage.module.css'
import User from '../components/User/User'

const ProfilePage = () => {
   const [draftComments, setDrafComments] = useState()
   const [draftInteviews, setDrafInterviews] = useState()
   const [hasCommentChange, setHasCommentChange] = useState(false)
   const [hasInterviewChange, setHasInterviewChange] = useState(false)
   const [user, setUser] = useState()
   const { isLoggedIn } = useAuthContext()

   useEffect(() => {
      ;(async () => {
         if (isLoggedIn) {
            try {
               const fUser = await getCurrentUser()
               setUser(fUser)
            } catch (e) {
               console.log(e)
            }
         }
      })()
   }, [isLoggedIn])

   const hasCommentChangeHandler = useCallback(() => {
      setHasCommentChange((prevState) => !prevState)
   }, [])

   const hasInterviewChangeHandler = useCallback(() => {
      setHasInterviewChange((prevState) => !prevState)
   }, [])

   useEffect(() => {
      ;(async () => {
         if (user) {
            try {
               const dInt = await getUserDraftInterviews(user.id)
               setDrafInterviews(dInt)
            } catch (e) {
               console.log(e)
            }
         }
      })()
   }, [hasInterviewChange, user])

   useEffect(() => {
      ;(async () => {
         if (user) {
            try {
               const dComm = await getUserDraftComments(user.id)
               setDrafComments(dComm)
            } catch (e) {
               console.log(e)
            }
         }
      })()
   }, [hasCommentChange, user])

   return (
      <Animate>
         <Wrapper>
            <div className={styles['profile-content']}>
               {draftComments && draftInteviews ? (
                  <>
                     <User user={user} />
                     <div className={styles['profile-sections']}>
                        <h3>Komentari na cekanju</h3>
                        <div
                           style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem',
                              paddingBottom: '1rem',
                           }}
                        >
                           {draftComments && draftComments.length > 0
                              ? draftComments.map((comment) => (
                                   <CompanyComment
                                      comment={comment}
                                      userId={comment.attributes.user.data.id}
                                      key={comment.id}
                                      company={comment.attributes.company.data}
                                      refresh={() => {}}
                                      commentHasChanged={
                                         hasCommentChangeHandler
                                      }
                                   />
                                ))
                              : 'Nema podataka!'}
                        </div>
                        <hr style={{ width: '100%', margin: '0' }} />
                        <h3>Intervjui na cekanju</h3>
                        <div
                           style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.5rem',
                              paddingBottom: '1rem',
                           }}
                        >
                           {draftInteviews && draftInteviews.length > 0
                              ? draftInteviews.map((interview) => (
                                   <CompanyInterview
                                      interview={interview}
                                      userId={interview.attributes.user.data.id}
                                      key={interview.id}
                                      company={
                                         interview.attributes.company.data
                                      }
                                      refresh={() => {}}
                                      interviewHasChanged={
                                         hasInterviewChangeHandler
                                      }
                                   />
                                ))
                              : 'Nema podataka!'}
                        </div>
                     </div>
                  </>
               ) : (
                  'Loading...'
               )}
            </div>
         </Wrapper>
      </Animate>
   )
}

export default ProfilePage
