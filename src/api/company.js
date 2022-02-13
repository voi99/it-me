import API from './axios'

export const fetchCompany = async (slug) => {
   try {
      const params = new URLSearchParams([
         ['filters[slug][$eq]', slug],
         ['populate', '*'],
      ])
      const response = await API.get('/companies', { params })
      return response.data.data[0]
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
