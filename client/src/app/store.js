import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import jobsReducer from '../features/jobs/jobsSlice'
import savedReducer from '../features/saved/savedSlice'
import resumesReducer from '../features/resumes/resumesSlice'
import aiReducer from '../features/ai/aiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    saved: savedReducer,
    resumes: resumesReducer,
    ai: aiReducer,
  },
})
