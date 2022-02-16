import API from './axios'

export const addSalary = async (data) => {
   try {
      const response = await API.post('/salaries', { data })
      return response
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
