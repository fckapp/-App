import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@entities/auth/model/Slice.js';
import alertReducer from 'src/entities/alert/model/AlertSlice.js';

// configureStore를 사용하여 store를 설정
export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});
