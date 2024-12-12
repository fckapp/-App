import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  isLogged: false,
  isLogging: false,
  error: null,
  user: null, // 사용자 정보
  loginMethod: null, // 로그인 방법 (email, kakao, google 등)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.isLogging = true;
      state.error = null;
      state.loginMethod = action.payload; // 로그인 방식 (email, kakao 등)
    },

    loginSuccess: (state, action) => {
      state.isLogged = true;
      state.isLogging = false;
      state.user = action.payload; // 사용자 정보 (email이나 소셜 로그인 사용자 정보)
    },

    loginFailure: (state, action) => {
      state.isLogging = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.isLogged = false;
      state.isLogging = false;
      state.error = null;
      state.user = null;
      state.loginMethod = null;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setEmail, setPassword, setEmailError, setPasswordError, } = authSlice.actions;

export default authSlice.reducer;
