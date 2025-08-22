
import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from '@/store/jobsSlice'
import resumesReducer from '@/store/resumesSlice'
import savedJobsReducer from '@/store/savedJobsSlice'

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    resumes: resumesReducer,
    saved: savedJobsReducer,
  },
})

export default store
