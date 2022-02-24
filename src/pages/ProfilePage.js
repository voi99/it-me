import React, { useState, useEffect } from 'react'
import Wrapper from '../components/Layout/Wrapper'
import { getCurrentUser } from '../api/auth'
import { getUserDraftComments } from '../api/comment'
import CompanyComment from '../components/Comment/CompanyComment'

const ProfilePage = () => {
   const [user, setUser] = useState()
   const [draftComments, setDrafComments] = useState()

   useEffect(() => {
      ;(async () => {
         try {
            const fUser = await getCurrentUser()
            setUser(fUser)
         } catch (e) {
            console.log(e)
         }
      })()
   }, [])

   useEffect(() => {
      if (user) {
         ;(async () => {
            try {
               const dComm = await getUserDraftComments(user.id)
               setDrafComments(dComm)
            } catch (e) {
               console.log(e)
            }
         })()
      }
   }, [user])

   return (
      <Wrapper>
         {user ? (
            <div>
               {draftComments &&
                  draftComments.map((comment) => (
                     <CompanyComment
                        comment={comment}
                        userId={user.id}
                        key={comment.id}
                        company={comment.attributes.company}
                        refresh={() => {}}
                     />
                  ))}
            </div>
         ) : (
            'Loading...'
         )}
      </Wrapper>
   )
}

export default ProfilePage
