import http from '@/lib/http'

export async function list() {
  const res = await http.get('/resumes')
  return res.data
}

// create -> kirim { title, contentText }
export async function create(payload) {
  const body = {
    title: payload.name || payload.title || 'Untitled',
    contentText: JSON.stringify(payload),
  }
  const res = await http.post('/resumes', body)
  return res.data
}

// update -> PATCH /resumes/:id
export async function update(id, payload) {
  const body = {
    ...(payload.name || payload.title ? { title: payload.name || payload.title } : {}),
    contentText: JSON.stringify(payload),
  }
  const res = await http.patch(`/resumes/${id}`, body)
  return res.data
}

export async function remove(id) {
  const res = await http.delete(`/resumes/${id}`)
  return res.data
}
