import React, { useState, useEffect, useCallback } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { getCurrentUser } from '../api/auth'
import { getUserDraftComments } from '../api/comment'
import CompanyComment from '../components/Comment/CompanyComment'
import { getUserDraftInterviews } from '../api/interview'
import CompanyInterview from '../components/Interview/CompanyInterview'
import { Animate } from '../animations/Animate'

const ProfilePage = () => {
   const [draftComments, setDrafComments] = useState()
   const [draftInteviews, setDrafInterviews] = useState()
   const [hasCommentChange, setHasCommentChange] = useState(false)
   const [hasInterviewChange, setHasInterviewChange] = useState(false)

   const hasCommentChangeHandler = useCallback(() => {
      setHasCommentChange((prevState) => !prevState)
   }, [])

   const hasInterviewChangeHandler = useCallback(() => {
      setHasInterviewChange((prevState) => !prevState)
   }, [])

   useEffect(() => {
      ;(async () => {
         try {
            const fUser = await getCurrentUser()
            const dInt = await getUserDraftInterviews(fUser.id)
            setDrafInterviews(dInt)
         } catch (e) {
            console.log(e)
         }
      })()
   }, [hasInterviewChange])

   useEffect(() => {
      ;(async () => {
         try {
            const fUser = await getCurrentUser()
            const dComm = await getUserDraftComments(fUser.id)
            setDrafComments(dComm)
         } catch (e) {
            console.log(e)
         }
      })()
   }, [hasCommentChange])

   return (
      <Animate>
         <Wrapper>
            <div
               style={{
                  backgroundColor: 'var(--black)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
               }}
            >
               {draftComments && draftInteviews ? (
                  <div>
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
                                   commentHasChanged={hasCommentChangeHandler}
                                />
                             ))
                           : 'Nema podataka!'}
                     </div>
                     <hr style={{ margin: '1.5rem 0rem' }} />
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
                                   company={interview.attributes.company.data}
                                   refresh={() => {}}
                                   interviewHasChanged={
                                      hasInterviewChangeHandler
                                   }
                                />
                             ))
                           : 'Nema podataka!'}
                     </div>
                  </div>
               ) : (
                  'Loading...'
               )}
            </div>
         </Wrapper>
      </Animate>
   )
}

export default ProfilePage
