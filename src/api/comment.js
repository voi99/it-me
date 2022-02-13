import API from './axios'

export const fetchLatestComments = async () => {
   try {
      const params = new URLSearchParams([
         ['sort[0]', 'createdAt:desc'],
         ['populate', '*'],
      ])
      const response = await API.get('/comments', { params })
      return response.data.data
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const getCommentPositionAndSalary = async (id) => {
   try {
      const params = new URLSearchParams('populate=*')
      const response = await API.get(`/comments/${id}`, { params })
      const position =
         response.data.data.attributes.position.data.attributes.name
      const seniority =
         response.data.data.attributes.seniority.data.attributes.name
      return { position, seniority }
   } catch (ex) {
      //   throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
      console.log(ex)
   }
}
