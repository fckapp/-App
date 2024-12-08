import React, {useEffect, useState} from "react";
import {View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';
import {CustomLoadingful, CustomLoadinghalf} from '../Components/Custom_Loading.js';
import { BoxButton } from "../Components/Custom_Button.js";


// 회원가입 스텝 1단계
const Step1 = ({onNextStep, setEmail}) => {
    const [email, setEmailInput] = useState('');

    //사용자 이메일로 인증번호 보내기 
    const sendCode = async() => {
        //사용자 이메일 유효성 검사
        const emailRegex  = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex .test(email)) {
            Alert.alert('유효하지 않은 이메일 주소 입니다.', '이메일 주소를 확인해 주세요.');
            return;
        }
        setEmail(email); //사용자 이메일 상태 저장
        onNextStep();
        
    };
    return(
        <View style={styles.step_wrapper}>
            <Text style={styles.step}>1/2 단계</Text>
            <Text style={styles.step_title}>이메일 주소를 입력해 주세요.</Text>

            {/* 사용자 이메일 주소 입력란 */}
            <Text style={styles.step_msg}>이메일 주소</Text>
            <TextInput
                style={styles.Input_value}
                placeholder="Ilitayeo@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmailInput}
            />

            {/* 사용자 이메일 주소 설정 완료 버튼 및 2단계로 넘어가기 */}
            <BoxButton
                onPress={() => sendCode()}
                title='완료'
                titleColor='#FFFFFF'
                buttonColor="#87cefa"
            />
        </View>
    )
}

//회원가입 스텝 2단계
const Step2 = ({email, onFinish, onBackStep}) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const verifyPassword = async () => {
        try {
            // 비밀번호 확인
            if (password !== checkPassword) {
                Alert.alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            // 비밀번호 길이 확인 (Firebase는 최소 6자 이상)
            if (password.length < 6) {
                Alert.alert("비밀번호는 최소 6자 이상이어야 합니다.");
                return;
            }
            
            // 비밀번호 숫자 및 특수문자 포함여부 검사
            const hasNumber = /\d/; //숫자 포함 여부 확인
            const hasSpecialChar = /[!@#$%^&*(),.":{}|<>]/; //특수문자 포함 여부 확인
            if (!hasNumber.test(password)) {
                Alert.alert("비밀번호에는 숫자가 포함되어야 합니다.");
                return;
            }

            if (!hasSpecialChar.test(password)) {
                Alert.alert("비밀번호에는 특수문자가 포함되어야 합니다.");
                return;
            }


            // 비밀번호 설정
            setLoading(true);
            await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert('회원가입 완료');
            setLoading(false);
            onFinish(); // 회원가입 완료 후 로그인 화면으로 이동

        } catch (error) {
            setLoading(false); // 로딩 종료
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert("이메일이 이미 사용 중입니다.");
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert("유효하지 않은 이메일 주소입니다.");
            } else {
                Alert.alert("회원가입 중 오류가 발생했습니다.", error.message);
            }
        }
    };


    return (
        <View style={styles.step_wrapper}>
            <Text style={styles.step}>2/2단계</Text>
            <Text style={styles.step_title}>비밀번호를 설정해 주세요.</Text>

            {/* 사용자 비밀번호 입력란 */}
            <Text style={styles.step_msg}>비밀번호</Text>
            <TextInput
                style={styles.Input_value}
                placeholder="영문/숫자/특수문자"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            {/* 사용자 비밀번 확인 입력란 */}
            <Text style={styles.step_msg}>비밀번호 확인</Text>
            <TextInput
                style={styles.Input_value}
                secureTextEntry={true}
                value={checkPassword}
                onChangeText={setCheckPassword}
            />

            {/* 비밀번호 설정 완료 버튼 */}
            <BoxButton
                onPress={() => verifyPassword()}
                title='완료'
                titleColor='#FFFFFF'
                buttonColor="#87cefa"
            />

            {/* 로딩 화면 */}
            {loading && <CustomLoadingful/>}
        </View>
    );
}

const Register = () => {
    //네비게이션 
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const navigation = useNavigation();


    const goToNextStep = () => setStep((prev) => prev + 1);
    const goBackStep = () => setStep((prev) => prev - 1);

    const goToLogin =() => {
        navigation.navigate("로그인");
    };

    return (
        <View style={styles.container}>
          {step === 1 && <Step1 onNextStep={goToNextStep} setEmail={setEmail} />}
          {step === 2 && <Step2 email={email} onFinish={goToLogin} onBackStep={goBackStep} />}
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
    Input_value: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#a9a9a9',
        marginBottom: 20,
    },
});

export default Register;