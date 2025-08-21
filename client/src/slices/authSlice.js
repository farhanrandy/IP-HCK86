import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '@/lib/http'

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (idToken)=>{
  const { data } = await http.post('/auth/google', { idToken })
  return data
})

const initialToken = localStorage.getItem('access_token')

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: initialToken || null, user: null, status:'idle', error:null },
  reducers: {
    logout: (state)=>{ state.token=null; state.user=null; localStorage.removeItem('access_token') },
    setUser: (state, action)=>{ state.user = action.payload }
  },
  extraReducers: (b)=>{
    b.addCase(loginWithGoogle.pending, (s)=>{ s.status='loading'; s.error=null })
     .addCase(loginWithGoogle.fulfilled, (s,a)=>{ s.status='succeeded'; s.token=a.payload.access_token; s.user=a.payload.user; localStorage.setItem('access_token', a.payload.access_token) })
     .addCase(loginWithGoogle.rejected, (s,a)=>{ s.status='failed'; s.error=a.error?.message || 'Login gagal' })
  }
})

export const { logout, setUser } = authSlice.actions
export default authSlice.reducer
