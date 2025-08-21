import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../lib/http'
import { setToken, clearToken, getToken } from '../../lib/token'

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const { data } = await http.post('/auth/google', { idToken })
      if (!data?.access_token) throw new Error('Missing access_token')
      setToken(data.access_token)
      return { accessToken: data.access_token }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message)
    }
  }
)

const initialState = {
  accessToken: getToken() || null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      clearToken()
      state.accessToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.accessToken = action.payload.accessToken
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Login failed'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
