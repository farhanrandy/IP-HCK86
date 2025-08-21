// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import http from '@/lib/http'

// export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (q)=>{
//   const { data } = await http.get('/jobs/search', { params: { q } })
//   return data
// })

// const jobsSlice = createSlice({
//   name: 'jobs',
//   initialState: { q:'', results:[], status:'idle', error:null },
//   reducers: { setQuery: (s,a)=>{ s.q=a.payload } },
//   extraReducers: (b)=>{
//     b.addCase(fetchJobs.pending, (s)=>{ s.status='loading'; s.error=null })
//      .addCase(fetchJobs.fulfilled, (s,a)=>{ s.status='succeeded'; s.results=a.payload?.data || [] })
//      .addCase(fetchJobs.rejected, (s,a)=>{ s.status='failed'; s.error=a.error?.message || 'Gagal mengambil jobs' })
//   }
// })

// export const { setQuery } = jobsSlice.actions
// export default jobsSlice.reducer

// src/slices/jobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/lib/http'

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async ({ q, location })=>{
  const params = { q: q || '' }
  if (location && location.trim()) params.location = location.trim()
  const { data } = await http.get('/jobs/search', { params })
  return data
})

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: { q:'', location:'', results:[], status:'idle', error:null },
  reducers: {
    setQuery: (s,a)=>{ s.q = a.payload },
    setLocation: (s,a)=>{ s.location = a.payload },
  },
  extraReducers: (b)=>{
    b.addCase(fetchJobs.pending, (s)=>{ s.status='loading'; s.error=null })
     .addCase(fetchJobs.fulfilled, (s,a)=>{
       s.status = 'succeeded'
       const items = a.payload?.jobs || a.payload?.data || []
       // NORMALIZE -> bikin shape yang konsisten untuk UI
       s.results = items.map(j => ({
         externalId: j.job_id || j.externalId || j.id,
         title: j.title,
         company: j.company,
         location: j.location,
         postedAt: j.posted_at || j.postedAt,
         employmentType: j.schedule_type || j.employmentType,
         applyUrl: j.apply_link || j.applyUrl,
         description: j.description || '',
         _raw: j, // simpan payload asli buat disave
       }))
     })
     .addCase(fetchJobs.rejected, (s,a)=>{ s.status='failed'; s.error = a.error?.message || 'Gagal mengambil jobs' })
  }
})

export const { setQuery, setLocation } = jobsSlice.actions
export default jobsSlice.reducer
