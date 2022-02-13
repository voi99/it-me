import API from './axios'

export const loginUser = async (data) => {
   try {
      const response = await API.post('/auth/local', data)
      const { jwt, user } = response.data
      return { jwt, user }
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const createUser = async (data) => {
   try {
      const response = await API.post('/auth/local/register', data)
      const { jwt, user } = response.data
      const { id } = user
      return { jwt, id }
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
