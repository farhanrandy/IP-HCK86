import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/lib/http'

export const generateLetter = createAsyncThunk('letter/generate', async (payload)=>{
  const body = { ...payload, tone: 'formal' }
  const { data } = await http.post('/ai/cover-letter', body)
  return data
})

const letterSlice = createSlice({
  name: 'letter',
  initialState: { content:'', status:'idle', error:null },
  reducers: { setContent: (s,a)=>{ s.content = a.payload } },
  extraReducers: (b)=>{
    b.addCase(generateLetter.pending, (s)=>{ s.status='loading'; s.error=null })
     .addCase(generateLetter.fulfilled, (s,a)=>{ s.status='succeeded'; s.content = a.payload?.content || '' })
     .addCase(generateLetter.rejected, (s,a)=>{ s.status='failed'; s.error = a.error?.message || 'Gagal generate letter' })
  }
})

export const { setContent } = letterSlice.actions
export default letterSlice.reducer
