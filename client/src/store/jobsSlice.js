import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as jobs from '@/services/jobs'
import * as saved from '@/services/savedJobs'

export const fetchJobs = createAsyncThunk('jobs/fetch',
  async ({ q, location, page }, _thunkAPI) => {
    const res = await jobs.getJobs(q || '', location || '', page || undefined)
    return res
  })

export const saveJobThunk = createAsyncThunk('jobs/save',
  async ({ jobExternalId, source='google', jobPayload }, _thunkAPI) => {
    const res = await saved.saveJob(jobExternalId, source, jobPayload)
    return res
  })

const slice = createSlice({
  name: 'jobs',
  initialState: {
    q: '',
    location: '',
    results: [],
    status: 'idle',
    error: null,
    savedExternalIds: {},
  },
  reducers: {
    setQuery(state, action) { state.q = action.payload },
    setLocation(state, action) { state.location = action.payload },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (s)=>{ s.status='loading'; s.error=null })
      .addCase(fetchJobs.fulfilled, (s,a)=>{
        s.status='succeeded'
        const payload = a.payload
        s.results = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : [])
      })
      .addCase(fetchJobs.rejected, (s,a)=>{ s.status='failed'; s.error=a.error?.message })
      .addCase(saveJobThunk.fulfilled, (s,a)=>{
        const savedItem = a.payload?.data || a.payload
        const ext = savedItem?.jobExternalId || savedItem?.job_external_id
        if (ext) s.savedExternalIds[ext] = true
      })
  }
})

export const { setQuery, setLocation } = slice.actions
export default slice.reducer
