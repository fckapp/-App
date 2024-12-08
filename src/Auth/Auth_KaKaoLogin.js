import React from 'react';
import * as KaKaoLogin from '@react-native-seoul/kakao-login'; // Kakao SDK 사용
import auth, { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 카카오톡 로그인 버튼을 누르면 easyKaKaoLogin 함수 호출 시작점
export const easyKaKaoLogin = async () => {
    const accessToken = await loginWithKakao(); // 카카오톡 로그인
    if (accessToken) {
        const userInfo = await fetchUserInfo(accessToken); // 사용자 정보 가져오기
        const email = userInfo.kakao_account.email; // 이메일 추출
        if (email) {
            await registerWithEmail(email); // Firebase Auth에 이메일 저장
            return true;
        }
    } else {
        console.error('Failed to get access token');
        return false;
    }
};

// 카카오톡 로그인시 사용자 토큰 추출
const loginWithKakao = async () => {
    try {
        const result = await KaKaoLogin.loginWithKakaoAccount({
            scopes: ['account_email'],
        });

        if (result.accessToken) {
            console.log('Access Token:', result.accessToken);
            return result.accessToken; // 액세스 토큰 반환
        } else {
            console.error('No access token received');
        }
    } catch (error) {
        console.error('Kakao login error:', error);
    }
};

// 사용자가 카카오톡으로 로그인 하면 해당 사용자의 카카오톡 토큰을 가지고 이메일 정보 요청
const fetchUserInfo = async (accessToken) => {
    try {
        const response = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('사용자 로그인 정보 호출 실패 다시 시도 해주세요.');
        }

        const userInfo = await response.json();
        return userInfo;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
};

// fetchUserInfo 함수에서 사용자 이메일을 파이어베이스 auth에 저장하는 함수
const registerWithEmail = async (email) => {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, 'temporaryPassword');
        console.log('User registered with email:', userCredential.user.email);

        //사용자 정보를  AsyncStorage에 저장
        const userEmail = {email}; //사용자 이메일 객체 생성
        await AsyncStorage.setItem('email', JSON.stringify(userEmail));
        console.log('사용자 이메일 AsyncStorage에 저장 성공');
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 'auth/email-already-in-use') {
            await firebase.auth().signInWithEmailAndPassword(email, 'temporaryPassword');
            console.log('User logged in with email:', email);
        }
    }
};

// 앱 시작 시 기존 사용자 자동 로그인 처리
 export const checkKaKaoAutoLogin = async () => {
    try {
        const userStringEmail = await AsyncStorage.getItem("email");

        if (userStringEmail) {
            const user = JSON.parse(userStringEmail);
            await auth().signInWithEmailAndPassword(user.email, 'temporaryPassword');
            console.log('카카오톡 자동 로그인 성공');
            return true;
        } else {
            console.log('카카오톡 자동 로그인 실패');
            return false;
        }
    } catch (error) {
        console.log('카카오톡 자동 로그인 Error', error);
        return false;
    }
};


