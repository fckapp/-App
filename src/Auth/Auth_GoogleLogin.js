import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const easyGoogleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        
        // Google Sign-In 수행
        const signInResult = await GoogleSignin.signIn();
        console.log(signInResult, "Sign In Result");

        // ID 토큰 확인
        let idToken = signInResult.idToken || signInResult?.data?.idToken;
        
        if (!idToken) {
            throw new Error('아이디 토큰 찾기 실패');
        }

        // Google 자격 증명 생성
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Firebase에 로그인
        return auth().signInWithCredential(googleCredential); 
    } catch (error) {
        // 에러 메시지 개선
        console.log('에러 발생:', error.message);
        return false;
    }
};
