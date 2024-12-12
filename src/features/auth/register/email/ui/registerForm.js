import React, {useState} from "react";
import {View, Text, Alert, StyleSheet} from 'react-native';
import {CustomLoadingful} from '../Components/Custom_Loading.js';
import { validateEmail, validatePassword } from "src/features/auth/register/email/model/index.js";
import { CompleteButton } from '@shared/ui/index.js'
import { useSelector, useDispatch} from 'react-redux';
import { setEmail, setEmailError, setPassword, setPasswordError } from "src/entities/auth/index.js";
import {BoxTextInput} from '@shared/ui/index.js';
import {RegisterWithFirebase} from '../api/emailRegisterApi.js';
import { useNavigation } from "@react-navigation/native";

const { email, password, emailError, passwordError } = useSelector((state) => state.auth);
const dispatch = useDispatch();

export const RegisterForm = () => {
    const [step, setStep] = useState(1);
    const navigation = useNavigation();


    const goToNextStep = () => setStep((prev) => prev + 1);

    const goToLogin =() => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            {step === 1 && <Step1 onNextStep={goToNextStep} setEmail={email} />}
            {step === 2 && <Step2 email={email} onFinish={goToLogin} />}
        </View>
    );
};


// 회원가입 스텝 1단계
const Step1 = ({onNextStep}) => {

    const handleEmailChange = (text) => {
        const emailError = validateEmail(text);
        dispatch(setEmailError(emailError));
        dispatch(setEmail(text));
    };

    // 이메일이 유효한지 확인
    const isFormValid = !emailError && email

    return(
        <View style={styles.step_wrapper}>
            <Text style={styles.step}>1/2 단계</Text>
            <Text style={styles.step_title}>이메일 주소를 입력해 주세요.</Text>

            {/* 사용자 이메일 입력 */}
            <BoxTextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="이메일 주소"
                errorMessage={emailError}
                onBlur={() => validateEmail(email)} // 포커스 아웃 시 유효성 검사
            />

            {/* 사용자 이메일 주소 입력 완료 박스 버튼 */}
            <View style={styles.CompleteButton}>
                <CompleteButton
                    onPress={() => onNextStep()}
                    title='완료'
                    titleColor='#FFFFFF'
                    buttonColor={isFormValid ?  '#87cefa': "#D3D3D3"} // 유효하면 파란색, 아니면 회색
                    disabled={!isFormValid} // 유효하지 않으면 비활성화
                />
            </View>
        </View>
    )
}


//회원가입 스텝 2단계 비밀번호 입력 및 비밀번호 확인
const Step2 = ({email, onFinish}) => {

    // 비밀번호 확인 패스워드는 로컬 상태로 관리
    const [checkPassword, setCheckPassword] = useState('');
    

    //비밀번호 유효성 검사 후 문제 없으면 비밀번호 리튜서로 저장
    const handlePasswordChange = (text) => {
        const passwordError = validatePassword(text);  // 비밀번호 유효성 검사
        dispatch(setPasswordError(passwordError));
        dispatch(setPassword(text));
    };

    // 첫번째 비밀번호와 일치하는지 검사
    // const handlePasswordCheck = ()
    
    return (
        <View style={styles.step_wrapper}>
            <Text style={styles.step}>2/2단계</Text>
            <Text style={styles.step_title}>비밀번호를 설정해 주세요.</Text>

            {/* 사용자 비밀번호 입력 */}
            <BoxTextInput
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="비밀번호"
                errorMessage={emailError}
                onBlur={() => validatePassword(password)} // 포커스 아웃 시 유효성 검사
            />

            {/* 사용자 비밀번호 확인 입력 */}
            <BoxTextInput
                value={checkPassword}
                onChangeText={setCheckPassword}
                placeholder="비밀번호 확인"
                errorMessage={emailError}
                onBlur={() => validatePassword(password)} // 포커스 아웃 시 유효성 검사
            />

            {/* 회원가입 완료 박스 버튼 */}
            <View style={styles.CompleteButton}>
                <CompleteButton
                    onPress={() => RegisterWithFirebase(email, password, checkPassword)}
                    title='회원가입'
                    titleColor='#FFFFFF'
                    buttonColor={isFormValid ?  '#87cefa': "#D3D3D3"} // 유효하면 파란색, 아니면 회색
                    disabled={!isFormValid} // 유효하지 않으면 비활성화
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#ffffff',
    },

    step_wrapper: {
        flex: 1,
    },
    step: {
        fontSize: 16,
        color: '#a9a9a9',
    },
    step_title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    step_msg: {
        fontSize: 12,
        color: '#a9a9a9',
    },
});