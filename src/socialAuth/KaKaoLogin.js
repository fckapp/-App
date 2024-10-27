import React from 'react';
import { KAKAO_APP_KEY } from '@env'; // .env 환경변수 파일에서 카카오 API 호출
import { snsSaveUser, snsFindUser } from '../services/Firestore.js'; // Firestore.js 파일 임포트
import { LoginManager } from '@react-native-seoul/kakao-login'; // Kakao SDK 사용

// 카카오톡 로그인 함수
export const easyKaKaoLogin = async () => {
    console.log('로그인 요청 시작');

    try {
        const result = await LoginManager.login(); // Kakao SDK 로그인 메서드

        if (result.status === 'success') {
            console.log('로그인 성공:', result);
            const userInfo = result.user; // 사용자 정보

            // 사용자 정보를 DB에 저장
            const existingUser = await snsFindUser(); // DB에서 사용자 정보 조회
            const userExists = existingUser.find(user => user.socialId === userInfo.id); // 기존 사용자 조회

            if (!userExists) {
                // 만약 DB에 사용자 정보가 없으면 유저 아이디 및 생성날짜 저장
                await snsSaveUser({
                    socialId: userInfo.id,
                    createdAt: new Date(),
                });
            }

            console.log('사용자 정보 저장 완료');
        } else {
            throw new Error('로그인 실패');
        }
    } catch (error) {
        console.error('로그인 오류:', error);
        throw new Error('로그인에 실패하였습니다. 다시 시도해 주세요.');
    }
};
