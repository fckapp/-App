// toastConfig.js
import { BaseToast, SuccessToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  // success type을 커스터마이즈
  success: (props) => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: '#000000',  // 빨간색 배경, 50% 투명도
        borderLeftWidth: 60,
        borderLeftColor: '#00FF00',
        borderRadius: 10,
        width: '90%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15, // 패딩 설정
      }}
      text1Style={{
        fontSize: 16, // 텍스트 크기 설정
        color: 'white', // 텍스트 색상 설정
      }}
      text2Style={{
        color: '#FFFFFF',
      }}
    />
  ),
  
  // error type을 커스터마이즈
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#000000',  // 빨간색 배경, 50% 투명도
        borderLeftWidth: 60,
        borderLeftColor: '#FF6347',
        borderRadius: 10,
        width: '90%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15, // 패딩 설정
      }}
      text1Style={{
        fontSize: 16, // 텍스트 크기 설정
        color: 'white', // 텍스트 색상 설정
      }}
      text2Style={{
        color: '#FFFFFF',
      }}
    />
  ),
  BaseToast: (props) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: '#000000',  // 빨간색 배경, 50% 투명도
        borderRadius: 10,
        width: '90%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15, // 패딩 설정
      }}
      text1Style={{
        fontSize: 16, // 텍스트 크기 설정
        color: 'white', // 텍스트 색상 설정
      }}
      text2Style={{
        color: '#FFFFFF',
      }}
    />
  ),
};
