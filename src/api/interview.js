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
