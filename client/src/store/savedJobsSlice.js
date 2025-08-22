
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as saved from '@/services/savedJobs'

export const fetchSavedJobs = createAsyncThunk('saved/list', async () => {
  const res = await saved.list()
  return res
})

export const patchSelectedResume = createAsyncThunk('saved/patchResume',
  async ({ id, selectedResumeId }) => {
    const res = await saved.patchSelectedResume(id, selectedResumeId)
    return res
  })

export const deleteSavedJob = createAsyncThunk('saved/delete',
  async (id) => {
    await saved.remove(id)
    return id
  })

const slice = createSlice({
  name: 'saved',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSavedJobs.pending, (s) => { s.status = 'loading' })
     .addCase(fetchSavedJobs.fulfilled, (s, a) => {
       s.status = 'succeeded'
       s.items = a.payload?.data || a.payload || []
     })
     .addCase(fetchSavedJobs.rejected, (s, a) => {
       s.status = 'failed'; s.error = a.error?.message
     })
     .addCase(patchSelectedResume.fulfilled, (s, a) => {
       const updated = a.payload?.data || a.payload
       const idx = s.items.findIndex(x => x.id === updated.id)
       if (idx !== -1) s.items[idx] = updated
     })
     .addCase(deleteSavedJob.fulfilled, (s, a) => {
       s.items = s.items.filter(x => x.id !== a.payload)
     })
  }
})

export default slice.reducer
