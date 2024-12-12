import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// 구글 간편 로그인 파이어베이스와 상호작용
export const GoogleLoginLogic = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
        // Google Sign-In 수행
        const signInResult = await GoogleSignin.signIn();

        // ID 토큰 확인
        let idToken = signInResult.idToken || signInResult?.data?.idToken;
        
        if (!idToken) {
            throw new Error('아이디 토큰 찾기 실패');
        }

        // Google 자격 증명 생성
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        // Firebase에 로그인 및 사용자 정보 반환
        const userCredential = await auth().signInWithCredential(googleCredential);
        
        
        
        return userCredential.user;

    } catch (error) {
        // 에러 메시지 개선
        console.log('에러 발생:', error.message);
        return;
    }
};
