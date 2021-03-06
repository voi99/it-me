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
               'year_stats',
            ],
         ],
      ])
      const response = await API.get('/companies', { params })
      return response.data.data[0]
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const filterCompanies = async (cName) => {
   try {
      const params = new URLSearchParams([
         ['filters[name][$containsi]', cName],
         ['sort', 'name:asc'],
         ['populate', '*'],
      ])
      const response = await API.get('/companies', { params })
      return response.data.data
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const fetchCompanyComments = async (companyId, limit) => {
   try {
      const params = new URLSearchParams([
         ['filters[company][id][$eq]', companyId],
         ['populate', 'seniority,position,user'],
         ['sort', 'createdAt:desc'],
         ['pagination[limit]', limit],
      ])
      const response = await API.get('/comments', { params })
      const total = response.data.meta.pagination.total
      const comments = response.data.data
      return { total, comments }
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const fetchCompanySalaries = async (companyId) => {
   try {
      const params = new URLSearchParams([
         ['filters[company][id][$eq]', companyId],
         ['populate', 'position,seniority'],
      ])
      const response = await API.get(`/salaries`, { params })
      return response.data.data
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}

export const fetchCompanyInterviews = async (companyId, limit) => {
   try {
      const params = new URLSearchParams([
         ['filter[company][id][$eq]', companyId],
         ['populate', 'seniority,position,user'],
         ['sort', 'createdAt:desc'],
         ['pagination[limit]', limit],
      ])
      const response = await API.get('/interviews', { params })
      const total = response.data.meta.pagination.total
      const interviews = response.data.data
      return { total, interviews }
   } catch (ex) {
      throw Error(ex?.response?.data?.error?.message ?? 'Unknown error')
   }
}
