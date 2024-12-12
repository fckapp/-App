// components/ToastAlert.js
import React, { useEffect, forwardRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { hideAlert } from '@entities/alert/index.js';
import {toastConfig} from './ToastConfig.js';

export const ToastAlert = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {visible, type, position, text1, text2, duration } = useSelector((state) => state.alert);

  useEffect(() => {
    if (visible) {
      // Toast 표시
        Toast.show({
            type: type,
            position: position,
            text1: text1,
            text2: text2,
            duration: duration,
            autoHide: true,
        });

      // Toast가 끝난 후 alert 숨기기
      setTimeout(() => {
        dispatch(hideAlert());
      }, duration);
    }
  }, [visible, type, text1, text2, position, dispatch]);

  

  return <Toast ref={ref} config={toastConfig}/>;
});
