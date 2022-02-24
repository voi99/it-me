import API from './axios'

export const fetchLatestComments = async () => {
   try {
      const params = new URLSearchParams([
         ['sort[0]', 'createdAt:desc'],
         ['populate', '*'],
         ['pagination[pageSize]', '6'],
      ])
      const response = await API.get('/comments', { params })
      return response.data.data
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const addComment = async (data) => {
   try {
      const response = await API.post('/comments', { data })
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const deleteComment = async (id) => {
   try {
      const response = await API.delete(`/comments/${id}`)
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const updateComment = async (id, data) => {
   try {
      const response = await API.put(`/comments/${id}`, { data })
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const getUserDraftComments = async (userId) => {
   try {
      const params = new URLSearchParams([
         ['filters[user][id][$eq]', userId],
         ['publicationState', 'preview'],
         ['filters[publishedAt][$null]', 'true'],
         ['populate', ['company', 'position', 'seniority', 'user']],
      ])
      const response = await API.get('/comments', { params })
      return response.data.data
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
