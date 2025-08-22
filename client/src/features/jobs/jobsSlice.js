import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../lib/http'

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ q, location, page }, { rejectWithValue }) => {
    try {
      const params = {}
      if (q) params.q = q
      if (location) params.location = location
      if (page) params.page = page
      const { data } = await http.get('/jobs/search', { params })
      const jobs = Array.isArray(data) ? data : (data?.jobs || [])
      return { jobs }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message)
    }
  }
)

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    q: '',
    location: '',
    page: 1,
  },
  reducers: {
    setQuery(state, action) { state.q = action.payload },
    setLocation(state, action) { state.location = action.payload },
    setPage(state, action) { state.page = action.payload },
    resetJobs(state) { state.list = []; state.page = 1 },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (s)=>{s.status='loading'; s.error=null;})
      .addCase(fetchJobs.fulfilled,(s,a)=>{s.status='succeeded'; s.list=a.payload.jobs;})
      .addCase(fetchJobs.rejected,(s,a)=>{s.status='failed'; s.error=a.payload;})
  }
})

export const { setQuery, setLocation, setPage, resetJobs } = jobsSlice.actions
export default jobsSlice.reducer
