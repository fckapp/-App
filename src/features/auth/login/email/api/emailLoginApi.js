import auth from '@react-native-firebase/auth';
import { loginStart, loginSuccess, loginFailure} from '@entities/auth/index';
import { showAlert } from '@entities/alert/index.js';

// 사용자 이메일 로그인 처리
export const   LoginWithFirebase = async(email, password, dispatch) => {

    // 로딩 상태 시작
    dispatch(loginStart('email'));

    try {
        // 파이어베이스 auth에 이메일/비밀번호로 로그인 시도
        await auth().signInWithEmailAndPassword(email, password);

        // 로그인 성공 시 상태 업데이트
        dispatch(loginSuccess({ email }));  // 사용자 정보 전달

        // 로그인 성공시 홈 스크린으로 이동
        dispatch(showAlert({
            type: 'success',
            text1: '로그인 성공',
            text2 : '이리타여에 오신것을 환영합니다.🤗',
        }));
        
    } catch(error) {
        console.log('로그인 실패 에러는?:', error);
        dispatch(loginFailure(error.message));
        dispatch(showAlert({
            type: 'error',
            text1: '로그인 오류',
            text2: '이메일 혹은 비밀번호를 확인해 주세요.😭',
        }));

    } finally {
        dispatch(loginFailure(null)); // 실패가 아닌 경우 null로 처리
    }
};