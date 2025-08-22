import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../lib/http'

export const generateCoverLetter = createAsyncThunk(
  'ai/generateCoverLetter',
  async ({ resume_text, job_description }, { rejectWithValue }) => {
    try {
      const { data } = await http.post('/ai/cover-letter', { resume_text, job_description })
      const coverLetter = data?.coverLetter || data?.data?.coverLetter || data?.result || ''
      return { coverLetter }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message)
    }
  }
)

const aiSlice = createSlice({
  name: 'ai',
  initialState: { coverLetter: '', status: 'idle', error: null },
  reducers: {
    clearCover(s){ s.coverLetter = ''; s.error=null; s.status='idle'; }
  },
  extraReducers: (b) => {
    b.addCase(generateCoverLetter.pending, (s)=>{s.status='loading'; s.error=null;})
     .addCase(generateCoverLetter.fulfilled, (s,a)=>{s.status='succeeded'; s.coverLetter=a.payload.coverLetter;})
     .addCase(generateCoverLetter.rejected, (s,a)=>{s.status='failed'; s.error=a.payload;})
  }
})

export const { clearCover } = aiSlice.actions
export default aiSlice.reducer
