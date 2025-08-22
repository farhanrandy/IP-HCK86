import http from '@/lib/http'

export async function getJobs(q='', location='', page) {
  const params = {}
  if (q) params.q = q
  if (location) {
    const city = location.split(',')[0].trim()
    if (city) params.location = city
  }
  if (page) params.page = page
  const res = await http.get('/jobs/search', { params })
  const payload = res.data
  const data = Array.isArray(payload?.jobs) ? payload.jobs : (payload?.data ?? [])
  return { data, nextPageToken: payload?.next_page_token ?? null }
}
