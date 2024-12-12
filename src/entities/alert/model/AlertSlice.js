// store/alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 알림 상태 초기값
const initialState = {
  visible: false,
  type: 'success', // 알림 유형 (success, error, info)
  text1: '', // 메인 메세지
  text2: '', // 서브 메세지
  position: 'top', // 알림 위치 (top, bottom)
  duration: 3000, // 알림 지속 시간
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      const { type, text1, text2, position, duration } = action.payload;
      state.visible = true;
      state.type = type || 'success';
      state.text1 = text1 || '';
      state.text2 = text2 || '';
      state.position = position || 'top';
      state.duration = duration || 3000;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.text1 = '';
      state.text2 = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
