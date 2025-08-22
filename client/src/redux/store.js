import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobsReducer from './jobsSlice';
import resumesReducer from './resumesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    resumes: resumesReducer,
  },
});
