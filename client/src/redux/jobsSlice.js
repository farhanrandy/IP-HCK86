import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Fetch jobs from search endpoint
export const searchJobs = createAsyncThunk('jobs/search', async ({ q, location }) => {
  const { data } = await api.get(`/jobs/search?q=${q}&location=${location}`);
  return data;
});

// Fetch saved jobs
export const fetchSavedJobs = createAsyncThunk('jobs/fetchSaved', async () => {
  const { data } = await api.get('/saved-jobs');
  return data;
});

// Save a job
export const saveJob = createAsyncThunk('jobs/save', async (jobId) => {
  const { data } = await api.post('/saved-jobs', { jobId });
  return data;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: { jobs: [], saved: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.saved = action.payload;
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.saved.push(action.payload);
      });
  },
});

export default jobsSlice.reducer;
