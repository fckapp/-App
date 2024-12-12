import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AlertModal } from '@shared/ui/index.js';


export const RegisterWithFirebase = async(email, password, checkPassword) => {
    const dispatch = useDispatch();

    try {

        if (password !== checkPassword) {
            Alert.alert('비밀번호가 일치하지 않습니다.');
            return;

        }

        await auth().createUserWithEmailAndPassword(email, password);
        onFinish();

    } catch (error) {

        if (error.code === 'auth/email-already-in-use') {
            Alert.alert("이메일이 이미 사용 중입니다.");

        } else if (error.code === 'auth/invalid-email') {
            Alert.alert("유효하지 않은 이메일 주소입니다.");

        } else {
            Alert.alert("회원가입 중 오류가 발생했습니다.", error.message);
        }
    }
};