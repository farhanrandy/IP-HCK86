import http from '@/lib/http'

export async function list() {
  const res = await http.get('/saved')
  return res.data
}

export async function saveJob(jobExternalId, source='google', jobPayload) {
  const res = await http.post('/saved', { jobExternalId, source, jobPayload })
  return res.data
}

export async function remove(id) {
  const res = await http.delete(`/saved/${id}`)
  return res.data
}

export async function generateCoverLetter(payload) {
  // expects { resume_text, job_description, tone?, lang? }
  const res = await http.post('/ai/cover-letter', payload)
  return res.data
}
