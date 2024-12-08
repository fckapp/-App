import React, {useState} from "react";
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import auth from '@react-native-firebase/auth';
import {CustomLoadingful, CustomLoadinghalf} from '../Components/Custom_Loading.js';
import {BoxButton} from '../Components/Custom_Button.js';

//일반 이메일 로그인 화면
const EmailLogin = ({route}) => {
    const [email, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { onLoginSuccess, onLoginError } = route.params; // props에서 가져오기

    // 사용자 이메일 로그인 처리
    const verifyLogin = async() => {
        setLoading(true);

        try {
            // 파이어베이스 auth에 이메일/비밀번호로 로그인 시도
            await auth().signInWithEmailAndPassword(email, password);
            // 로그인 성공시 홈 스크린으로 이동
            onLoginSuccess();
            Alert.alert('로그인에 성공 하셨습니다.');
        } catch(error) {
            console.log('로그인 실패 에러는?:', error);
            Alert.alert("로그인에 실패 하셨습니다", "이메일 주소 혹은 비밀번호를 확인해 주세요.");
            onLoginError();
        } finally {
            setLoading(false);
        }
    };


    return(
        <View style={styles.container}>
            {loading && <CustomLoadinghalf/>}
            <Text style={styles.step_title}>힘든 하루 고생했어요.{'\n'}이제 이리타여에서 즐거운 상상해봐요.</Text>
            

            {/* 사용자 이메일 입력 */}
            <Text style={styles.step_msg}>이메일 주소</Text>
            <TextInput
                style={styles.Input_value}
                placeholder="Ilitayeo@example.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmailInput}
            />

            {/* 사용자 비밀번호 입력 */}
            <Text style={styles.step_msg}>비밀번호</Text>
            <TextInput
                style={styles.Input_value}
                placeholder="영문/숫자/특수문자"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            {/* 로그인 완료 박스 버튼 */}
            <BoxButton
                onPress={() => verifyLogin()}
                title='완료'
                titleColor='#FFFFFF'
                buttonColor="#87cefa"
            />
        </View>
    )
};

// 스타일 시작
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingVertical: 30,
        alignContent: 'center',
    },
    step_title: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 100,
        // backgroundColor: '#000000'
        
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
    Button: {
        width: '100%',
        height: 50,
        backgroundColor: '#87cefa',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    Button_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },

});


export default EmailLogin;
