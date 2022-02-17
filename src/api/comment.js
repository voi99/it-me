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
