import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { language:'id', defaultResumeId:null },
  reducers: {
    setLanguage: (s,a)=>{ s.language = a.payload },
    setDefaultResumeId: (s,a)=>{ s.defaultResumeId = a.payload }
  }
})

export const { setLanguage, setDefaultResumeId } = settingsSlice.actions
export default settingsSlice.reducer
