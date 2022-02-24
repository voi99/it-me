import API from './axios'

export const fetchPositions = async () => {
   try {
      const response = await API.get('/positions')
      const positions = response.data.data.map((position) => ({
         value: position.id,
         label: position.attributes.name,
      }))
      return positions
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
