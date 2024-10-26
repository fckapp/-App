import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import {KaKaoAPI_KEY} from '@env'; //.env 환경변수 파일에서 카카오 api 호출
import {snsSaveUser, snsFindUser} from '../services/Firestore.js'; // Firestore.js 파일 임포트()


WebBrowser.maybeCompleteAuthSession();


// 카카오톡 로그인 함수
export const easyKaKaoLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
    });
    console.log('테스트 1');


    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KaKaoAPI_KEY}&redirect_uri=${redirectUri}&response_type=code`;
    console.log('테스트 1-1');

    const result = await AuthSession.startAsync({ authUrl })
    console.log('테스트 1-2');

    // 로그인 성공시 토큰 반환
    if (result.type === 'success') {
        const { code } = result.params;
        const  accessToken = await fetchAccessToken(code);
        const userInfo = await fetchUserInfo(accessToken);
        console.log('테스트 2');


        // 사용자 정보를 DB에 저장 (이부분 조심 나중에 문제 있을 경우 userInfo.id <= user_social_id 로 변경 해보세요)
        const existingUser = await snsFindUser(); //DB에서 사용자 정보 조회
        const userExisits = existingUser.find(user => user.socialId === userInfo.id); //기존 사용자 조회

        if (!userExisits) {
            // 만약에 DB에 사용자 정보가 없으면 유저 아이디 및 생성날짜 저장
            await snsSaveUser({
                socialId: userInfo.id,
                createdAt: new Date(),
            });
        }
        console.log('테스트 3');
    // 로그인 실패시 에러 메세지
    } else {
        throw new Error('로그인에 실패 하였습니다. 다시 시도해 주세요');
    }
};

// 사용자 카카오톡 토큰 가져오는 함수
export const fetchAccessToken = async (code) => {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&client_id=${KaKaoAPI_KEY}&redirect_uri=${redirectUri}&code=${code}`,
    });

    const data = await response.json();
    return data.access_token; //토큰 반환
};

// 사용자 정보 가져오는 함수
export const fetchUserInfo = async (accessToken) => {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const response = await fetch(userInfoUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // 정상적으로 불러오지 못했을 시 오류문구 출력
    if (!response.ok) {
        throw new Error('사용자님의 정보를 가져오는데 실패 하였습니다. 다시 시도해 주세요.')
    }
    const data = await response.json();
    return data;
};