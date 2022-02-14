import API from './axios'

export const fetchCompany = async (slug) => {
   try {
      const params = new URLSearchParams([
         ['filters[slug][$eq]', slug],
         [
            'populate',
            [
               'logo',
               'comments',
               'comments.position',
               'comments.seniority',
               'salaries',
               'salaries.position',
               'interviews',
            ],
         ],
      ])
      const response = await API.get('/companies', { params })
      return response.data.data[0]
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
