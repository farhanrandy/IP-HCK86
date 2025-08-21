import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../lib/http'

export const listResumes = createAsyncThunk('resumes/list', async (_, { rejectWithValue }) => {
  try {
    const { data } = await http.get('/resumes')
    return { items: data?.data || data || [] }
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message)
  }
})

export const createResume = createAsyncThunk('resumes/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.post('/resumes', payload)
    return { item: data?.data || data }
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message)
  }
})

export const updateResume = createAsyncThunk('resumes/update', async ({ id, ...payload }, { rejectWithValue }) => {
  try {
    const { data } = await http.put(`/resumes/${id}`, payload)
    return { item: data?.data || data }
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message)
  }
})

export const deleteResume = createAsyncThunk('resumes/delete', async (id, { rejectWithValue }) => {
  try {
    await http.delete(`/resumes/${id}`)
    return { id }
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message)
  }
})

const resumesSlice = createSlice({
  name: 'resumes',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(listResumes.pending, (s)=>{s.status='loading';})
     .addCase(listResumes.fulfilled, (s,a)=>{s.status='succeeded'; s.items=a.payload.items;})
     .addCase(listResumes.rejected, (s,a)=>{s.status='failed'; s.error=a.payload;})
     .addCase(createResume.fulfilled, (s,a)=>{ if(a.payload?.item) s.items.unshift(a.payload.item); })
     .addCase(updateResume.fulfilled, (s,a)=>{ 
        const up = a.payload?.item
        if(!up) return
        s.items = s.items.map(it=>it.id===up.id? up: it)
     })
     .addCase(deleteResume.fulfilled, (s,a)=>{ s.items = s.items.filter(it=>it.id!==a.payload.id); });
  }
})

export default resumesSlice.reducer
