import { loginWithKakao, fetchUserInfo, KaKaoLoginWithfirebaseEmail } from '../api/KakaoLoginApi';

// 카카오톡 로그인 버튼을 누르면 KaKaoLogin 함수 호출 시작점
export const KaKaoLoginLogic = async () => {
    const accessToken = await loginWithKakao(); // 카카오톡 로그인
    if (accessToken) {
        const userInfo = await fetchUserInfo(accessToken); // 사용자 정보 가져오기
        const email = userInfo.kakao_account.email; // 이메일 추출
        if (email) {
            await KaKaoLoginWithfirebaseEmail(email); // Firebase Auth에 이메일 저장
            return email;
        }
    } else {
        console.error('Failed to get access token');
        return;
    }
}; 

