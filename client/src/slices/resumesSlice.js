import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/lib/http'

export const fetchResumes = createAsyncThunk('resumes/fetchResumes', async ()=>{
  const { data } = await http.get('/resumes')
  return data
})
export const createResume = createAsyncThunk('resumes/createResume', async (payload)=>{
  const { data } = await http.post('/resumes', payload)
  return data
})
export const updateResume = createAsyncThunk('resumes/updateResume', async ({ id, payload })=>{
  const { data } = await http.put(`/resumes/${id}`, payload)
  return data
})
export const deleteResume = createAsyncThunk('resumes/deleteResume', async (id)=>{
  const { data } = await http.delete(`/resumes/${id}`)
  return { id, data }
})

const resumesSlice = createSlice({
  name: 'resumes',
  initialState: { list:[], status:'idle', error:null },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(fetchResumes.pending, (s)=>{ s.status='loading'; s.error=null })
     .addCase(fetchResumes.fulfilled, (s,a)=>{ s.status='succeeded'; s.list=a.payload || [] })
     .addCase(fetchResumes.rejected, (s,a)=>{ s.status='failed'; s.error=a.error?.message || 'Gagal ambil resume' })
     .addCase(createResume.fulfilled, (s,a)=>{ s.list.unshift(a.payload) })
     .addCase(updateResume.fulfilled, (s,a)=>{ s.list = s.list.map(r=> r.id===a.payload.id ? a.payload : r) })
     .addCase(deleteResume.fulfilled, (s,a)=>{ s.list = s.list.filter(r=> r.id !== a.payload.id) })
  }
})

export default resumesSlice.reducer
