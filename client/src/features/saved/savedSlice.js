import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../lib/http'

export const fetchSaved = createAsyncThunk('saved/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await http.get('/saved')
    return { items: data?.data || data || [] }
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message)
  }
})

export const saveJob = createAsyncThunk('saved/add', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await http.post('/saved', payload)
    return { item: data?.data || data }
  } catch (err) {
    return rejectWithValue(err.response.data.message || err.message)
  }
})

export const removeSaved = createAsyncThunk('saved/remove', async (id, { rejectWithValue }) => {
  try {
    await http.delete(`/saved/${id}`)
    return { id }
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || err.message)
  }
})

const savedSlice = createSlice({
  name: 'saved',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSaved.pending, (s)=>{s.status='loading';})
     .addCase(fetchSaved.fulfilled, (s,a)=>{s.status='succeeded'; s.items=a.payload.items;})
     .addCase(fetchSaved.rejected, (s,a)=>{s.status='failed'; s.error=a.payload;})
     .addCase(saveJob.fulfilled, (s,a)=>{ if(a.payload?.item) s.items.unshift(a.payload.item); })
     .addCase(removeSaved.fulfilled, (s,a)=>{ s.items = s.items.filter(it=>it.id!==a.payload.id); });
  }
})

export default savedSlice.reducer
