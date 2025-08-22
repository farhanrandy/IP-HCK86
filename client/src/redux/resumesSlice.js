import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchResumes = createAsyncThunk('resumes/fetch', async () => {
  const { data } = await api.get('/resumes');
  return data;
});

export const createResume = createAsyncThunk('resumes/create', async (payload) => {
  const { data } = await api.post('/resumes', payload);
  return data;
});

export const updateResume = createAsyncThunk('resumes/update', async ({ id, ...payload }) => {
  const { data } = await api.put(`/resumes/${id}`, payload);
  return data;
});

export const deleteResume = createAsyncThunk('resumes/delete', async (id) => {
  await api.delete(`/resumes/${id}`);
  return id;
});

const resumesSlice = createSlice({
  name: 'resumes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.fulfilled, (_, action) => action.payload)
      .addCase(createResume.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        const idx = state.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state[idx] = action.payload;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        return state.filter((r) => r.id !== action.payload);
      });
  },
});

export default resumesSlice.reducer;
