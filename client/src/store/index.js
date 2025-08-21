import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/slices/authSlice'
import jobsReducer from '@/slices/jobsSlice'
import savedJobsReducer from '@/slices/savedJobsSlice'
import resumesReducer from '@/slices/resumesSlice'
import letterReducer from '@/slices/letterSlice'
import settingsReducer from '@/slices/settingsSlice'

const store = configureStore({
  reducer: { auth: authReducer, jobs: jobsReducer, saved: savedJobsReducer, resumes: resumesReducer, letter: letterReducer, settings: settingsReducer },
})

export default store
