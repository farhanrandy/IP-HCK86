import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/lib/http'

export const fetchSavedJobs = createAsyncThunk('saved/fetchSavedJobs', async ()=>{
  const { data } = await http.get('/saved')
  return data
})
export const saveJob = createAsyncThunk('saved/saveJob', async (payload)=>{
  const { data } = await http.post('/saved', payload)
  return data
})
export const deleteSavedJob = createAsyncThunk('saved/deleteSavedJob', async (id)=>{
  const { data } = await http.delete(`/saved/${id}`)
  return { id, data }
})

const savedJobsSlice = createSlice({
  name: 'saved',
  initialState: { list:[], status:'idle', error:null },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(fetchSavedJobs.pending, (s)=>{ s.status='loading'; s.error=null })
     .addCase(fetchSavedJobs.fulfilled, (s,a)=>{ s.status='succeeded'; s.list=a.payload?.data || [] })
     .addCase(fetchSavedJobs.rejected, (s,a)=>{ s.status='failed'; s.error=a.error?.message || 'Gagal mengambil saved jobs' })
     .addCase(saveJob.fulfilled, (s,a)=>{
       const item = a.payload?.data
       if (item) s.list.unshift(item)
     })
     .addCase(saveJob.rejected, (s,a)=>{ s.error = a.error?.message || 'Gagal menyimpan job' })
     .addCase(deleteSavedJob.fulfilled, (s,a)=>{ s.list = s.list.filter(j=> j.id !== a.payload.id) })
  }
})

export default savedJobsSlice.reducer
