import { View, Text, StyleSheet } from 'react-native';
import { BoxTextInput } from '@shared/ui/index.js';
import { validateEmail, validatePassword } from 'src/features/auth/register/email/model/index.js';
import { useDispatch } from 'react-redux';
import { setEmail, setEmailError, setPassword, setPasswordError} from '@entities/auth/index';
import { LoginWithFirebase } from '../api/emailLoginApi.js';
import { CompleteButton } from '@shared/ui/index.js'
import { useSelector } from 'react-redux';

/* 이메일 주소 및 비밀번호를 입력하면 각각의 대해서 유효성 검사를 실시하고 
    유효성 검사에 위반되는 것이 있을경우 빨간색으로 에러메세지를 UI에 보이도록 작성
    로그인 완료 버튼을 누르면 파이어베이스Auth api 상호작용하여 사용자 로그인 진행 
*/

export const EmailLoginForm = () => {
    const dispatch = useDispatch();
    
    // Redux 상태에서 email, password, emailError, passwordError 가져오기
    const { email, password, emailError, passwordError } = useSelector((state) => state.auth);


    // 이메일 유효성 검사 후 이메일이 유효 하면 이메일 저장
    const handleEmailChange = (text) => {
        const emailError = validateEmail(text);
        dispatch(setEmailError(emailError));
        dispatch(setEmail(text));
    };


    // 비밀번호 유효성 검사 후 비밀번호가 유효하면 비밀번호 저장
    const handlePasswordChange = (text) => {
        const passwordError = validatePassword(text);  // 비밀번호 유효성 검사
        dispatch(setPasswordError(passwordError));
        dispatch(setPassword(text));
        
    };

    // 이메일과 비밀번호가 모두 유효한지 확인
    const isFormValid = !emailError && !passwordError && email && password;


    // 이메일 로그인 api 호출해서 로그인 
    const handleLogin = async () => {
        // 로그인 처리
        if (isFormValid) {
            await LoginWithFirebase(email, password, dispatch); // 비동기 로그인 함수 호출
        } else {
            dispatch(showAlert({
                type: 'error',
                text1: '로그인 실패',
            }));
        }
    };


    // UI
    return(
        <View style={styles.container}>
            {/* {loading && <CustomLoadinghalf/>} */}
            <Text style={styles.step_title}>힘든 하루 고생했어요.{'\n'}이제 이리타여에서 즐거운 상상해봐요.</Text>
            

            {/* 사용자 이메일 입력 */}
            <BoxTextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="이메일 주소"
                errorMessage={emailError}
                onBlur={() => validateEmail(email)} // 포커스 아웃 시 유효성 검사
            />

            {/* 사용자 비밀번호 입력 */}
            <BoxTextInput
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="비밀번호"
                secureTextEntry={true}
                errorMessage={passwordError}
                onBlur={() => validatePassword(password)} // 포커스 아웃 시 유효성 검사
            />

            {/* 로그인 완료 박스 버튼 */}
            <View style={styles.CompleteButton}>
                <CompleteButton
                    onPress={() => handleLogin()}
                    title='로그인'
                    titleColor='#FFFFFF'
                    buttonColor={isFormValid ?  '#000000': "#D3D3D3"} // 유효하면 파란색, 아니면 회색
                    disabled={!isFormValid} // 유효하지 않으면 비활성화
                />
            </View>
        </View>
    )
};


// 스타일 시트
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    step_title: {
        fontSize: 18,
        paddingHorizontal: 20,
        height: 80,
        fontWeight: 'bold',
    },
    CompleteButton: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#d0d0d0',
        position: 'absolute',
        bottom: 0,
    },

});
