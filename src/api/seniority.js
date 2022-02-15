import API from './axios'

export const fetchSeniorities = async () => {
   try {
      const response = await API.get('/seniorities')
      const seniorities = response.data.data.map((position) => ({
         value: position.id,
         name: position.attributes.name,
      }))
      return seniorities
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
