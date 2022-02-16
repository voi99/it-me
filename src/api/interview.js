import API from './axios'

export const addInterview = async (data) => {
   try {
      const response = await API.post('/interviews', { data })
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
