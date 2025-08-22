
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as resumes from '@/services/resumes'

export const fetchResumes = createAsyncThunk('resumes/list', async () => {
  const res = await resumes.list()
  return res
})

export const removeResume = createAsyncThunk('resumes/remove', async (id) => {
  await resumes.remove(id)
  return id
})

const slice = createSlice({
  name: 'resumes',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchResumes.pending, (s) => { s.status = 'loading' })
     .addCase(fetchResumes.fulfilled, (s, a) => {
       s.status = 'succeeded'
       s.items = a.payload?.data || a.payload || []
     })
     .addCase(fetchResumes.rejected, (s, a) => {
       s.status = 'failed'; s.error = a.error?.message
     })
     .addCase(removeResume.fulfilled, (s, a) => {
       s.items = s.items.filter(x => x.id !== a.payload)
     })
  }
})

export default slice.reducer
