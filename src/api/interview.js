import API from './axios'

export const addInterview = async (data) => {
   try {
      const response = await API.post('/interviews', { data })
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const deleteInterview = async (id) => {
   try {
      const response = await API.delete(`/interviews/${id}`)
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const updateInterview = async (id, data) => {
   try {
      const response = await API.put(`/interviews/${id}`, { data })
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const getUserDraftInterviews = async (userId) => {
   try {
      const params = new URLSearchParams([
         ['filters[user][id][$eq]', userId],
         ['publicationState', 'preview'],
         ['filters[publishedAt][$null]', 'true'],
         ['populate', ['company', 'position', 'seniority', 'user']],
      ])
      const response = await API.get('/interviews', { params })
      return response.data.data
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
