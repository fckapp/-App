import React, { useEffect, useState } from 'react';
// 네비게이션 임포트
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { StatusBar, SafeAreaView, View, TouchableOpacity } from 'react-native'; // SafeAreaView 추가
//아이콘 임포트
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import {HomeCustomHeader, SettingIconButton, SearchIconButton ,HotPlacesCustomHeader} from './src/components/Custom_Header.js';
//스크린 임포트
import BottomTab from './src/Components/Custom_BottomTab.js'; // BottomTab 경로 확인
import SplashScreen from './src/screens/Screen_Splash.js';
import LoginScreen from './src/screens/Screen_Login.js';
import NotificationScreen from './src/screens/Screen_Notification.js';
import SettingScreen from './src/screens/Screen_Setting.js';
import HotPlacesScreen from './src/screens/Screen_HotPlaces.js';
import ReviewForm from './src/Components/Custom_WriteReview.js';
import ChangeNickname from './src/screens/Screen_ChangeNickname.js';
import HotPlacesItem from './src/screens/Screen_HotPlacesItem.js';
import ReviewList from './src/screens/Screen_ReviewList.js';
// 로딩 임포트
import CustomLoading from './src/Components/Custom_Loading.js';
// 로그인 임포트 
import { checkKaKaoAutoLogin } from './src/Auth/Auth_KaKaoLogin.js';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEBClientId_KEY } from '@env';
import Register from './src/Auth/Auth_Register.js';
import EmailLogin from './src/Auth/Auth_EmailLogin.js';
// 파이어 베이스 초기화
import { db, auth, storage } from './src/Firebase/Firebase_Config.js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {NickNameProvider} from './src/Firebase/Services_NicknameContext.js';



// 본격적인 코드 시작
const App =() => {
    const Stack = createNativeStackNavigator(); // 스택 네비게이터 생성
    const [isLoading, setIsLoading] = useState(true);  //로딩
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEBClientId_KEY, // Firebase Console의 OAuth 2.0 클라이언트 ID
          });
        // 자동로그인을 하기위한 사용자 정보 확인
        const autoLogin = async () => { 

            // // 파이어베이스 AUTH에 기존 구글 로그인을 했던 사람은 자동으로 로그인
            // const GoogleloggedIn = auth().currentUser;
            // if (GoogleloggedIn) {
            //     setIsLoggedIn(true);
            //     setIsLoading(false);
            //     return;
            // }

            // from './src/SocialAuth/KaKaoLogin.js'에서 checkAutoLogin함수 호출
            const KaKaologgedIn = await checkKaKaoAutoLogin();
            setIsLoggedIn(KaKaologgedIn);
            setIsLoading(false); // 로딩 완료
        };


        // 자동 로그인 함수 호출
        autoLogin();
    }, []);

    if (isLoading) {
        return <SplashScreen />; // 로딩 중에는 SplashScreen 표시
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLoginError = () => {
        setIsLoggedIn(false);
    };

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <NickNameProvider>
                    <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                            animation: 'slide_from_right',
                        }}
                    >
                            {/* isLoggedIn이 ture이면 메인스크린으로 이동 false면 로그인 스크린으로 이동*/}
                            {isLoggedIn ? (
                                <>
                                    <Stack.Screen name="홈" component={BottomTab} options={{ headerShown: false }} />
                                    <Stack.Screen name="알림" component={NotificationScreen} options={{ headerShown: true }} />
                                    <Stack.Screen name="설정" component={SettingScreen} options={{ headerShown: true }} />
                                    <Stack.Screen
                                        name="핫플" 
                                        component={HotPlacesScreen} 
                                        options={{
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            headerTitle: '핫플',
                                            headerTitleStyle: {fontSize: 16, fontWeight: 'bold'},
                                        }} />
                                    <Stack.Screen 
                                        name="상세정보"
                                        component={HotPlacesItem}
                                        options={{
                                            headerShown: true,
                                            headerShadowVisible: false,
                                        }} />

                                    <Stack.Screen 
                                        name="리뷰쓰기" 
                                        component={ReviewForm} 
                                        options={{
                                            animation: 'slide_from_bottom',
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            headerTitleStyle: {fontSize: 16, fontWeight: 'bold'}
                                        }}
                                    />
                                    <Stack.Screen 
                                        name="닉네임변경" 
                                        component={ChangeNickname} 
                                        options={{
                                            animation: 'slide_from_right',
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            headerTitle: '닉네임변경',
                                            headerTitleStyle: {fontSize: 16, fontWeight: 'bold'}
                                        }}
                                    />
                                    <Stack.Screen 
                                        name="리뷰전체보기" 
                                        component={ReviewList} 
                                        options={{
                                            animation: 'slide_from_bottom',
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            headerTitle: '',
                                        }}
                                    />

                                </>
                            ) : (
                                <>
                                    {/* from './src/screens/LoginScreen.js';로 이동 해서 로그인 진행 */}
                                    <Stack.Screen 
                                        name="로그인" 
                                        component={LoginScreen} 
                                        options={{ 
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            headerTitle: 'ILITAYEO',
                                            headerTitleStyle: { // 여기서 타이틀 스타일을 설정
                                                fontSize: 14,  // 원하는 크기로 타이틀 폰트 크기 설정
                                                fontWeight: 'bold', // 굵은 폰트
                                                color: '#000', // 타이틀 색상 (선택 사항)
                                            },
                                            headerStyle: {
                                                backgroundColor: '#fff', // 헤더 배경 색 (선택 사항)
                                            },
                                            headerTitleAlign: 'center', // 타이틀을 중앙 정렬
                                        }}
                                        initialParams={{ onLoginSuccess: handleLoginSuccess, onLoginError: handleLoginError }} // Optional
                                    />
                                    <Stack.Screen
                                        name="회원가입"
                                        component={Register}
                                        options={{
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            animation: 'slide_from_right',
                                            headerTitle: '',
                                        }}
                                    />
                                    <Stack.Screen
                                        name="일반로그인"
                                        component={EmailLogin}
                                        options={{
                                            headerShown: true,
                                            headerShadowVisible: false,
                                            animation: 'slide_from_right',
                                            headerTitle: '',
                                        }}
                                    />
                                </>
                            )}

                        </Stack.Navigator>
                    </NavigationContainer>
                </NickNameProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;