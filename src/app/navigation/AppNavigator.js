// src/navigation/AppNavigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


// 로그인 관련 페이지 임포트
import { LoginPage, EmailLoginPage, RegisterPage} from 'src/pages/login/index.js';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginPage} 
            options={{
              headerShadowVisible: false,
              headerTitle: 'ILITAYEO',
              headerTitleStyle: { // 여기서 타이틀 스타일을 설정
                fontSize: 14,  // 원하는 크기로 타이틀 폰트 크기 설정
                fontWeight: 'bold', // 굵은 폰트
                color: '#000', // 타이틀 색상 (선택 사항)
              },
              headerTitleAlign: 'center', // 타이틀을 중앙 정렬
            }}
          />
          <Stack.Screen 
            name="emailLogin" 
            component={EmailLoginPage}
            options={{
              animation: 'slide_from_right',
              headerShadowVisible: false,
              headerTitle: '',
            }}
          />
          <Stack.Screen 
            name="register" 
            component={RegisterPage}
            options={{
              animation: 'slide_from_right',
              headerShadowVisible: false,
              headerTitle: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppNavigation;