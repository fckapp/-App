// 카카오톡, 네이버, 인스타, 애플 간편 로그인 및 일반 로그인 & 회원가입
import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text, SafeAreaView, Button, Alert} from 'react-native';
import SocialLoginButton from '../components/SocialLoginButton.js';
import { easyKaKaoLogin } from '../socialAuth/KaKaoLogin.js';


const { width } = Dimensions.get('window'); // 화면 너비와 높이 가져오기



// 로그인 스크린 시작
const LoginScreen = () => {
     // 로그인 진행을 알수있는 로딩
    const [Loading, setLoading] = React.useState(false);

    // 소셜 로그인 성공여부 
    const handleSocialLogin = async (loginFunction) => {
        setLoading(true);
        try {
            await loginFunction();
            Alert.alert('로그인 성공', '환영합니다.');
        } catch (error) {
            Alert.alert('로그인 실패', error.message);
        } finally {
            setLoading(false);
        }
    };

    // 카카오, 네이버, 인스타, 애플 간편로그인 버튼
    return (
        <SafeAreaView style={styles.container}>
            {/* 로고 이미지 박스 */}
            <View style={styles.imageLogoContainer}>
                {/* 로고 이미지 */}
                <Image source={require('../../assets/Login_logo.jpg')}
                    style={styles.loginLogo}
                    resizeMode='contain'
                />
            </View>
            <View>
                <Text style={styles.comment}>동남아 여행은{"\n"}이리타여와 함께</Text>
            </View>
            {/* 간편로그인 버튼 컨테이너 */}
            <View style={styles.socialLoginContainer}>
                {/* 카카오톡 로그인 버튼 */}
                <SocialLoginButton
                    title="카카오톡 간편 로그인"
                    icon={''}
                    onPress={() => handleSocialLogin(easyKaKaoLogin)}
                    loading={Loading}
                />
                {/* 네이버 로그인 버튼 */}
                {/* 인스타 로그인 버튼 */}
                {/* 애플 로그인 버튼 */}
            </View>
        </SafeAreaView>
    );
};

// 스타일 시트 시작
const styles = StyleSheet.create ({
    // 화면 전체 컨테이너
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // 이미지 로고 컨테이너
    imageLogoContainer: {
        width: width,
        height: 250,
        paddingTop: 100,
    },
    // 이미지 로고
    loginLogo: {
        width: '100%',
        height: '100%',
    },
    comment: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    socialLoginContainer: {
        backgroundColor: '#000000',
        width: '100%',
        height: 'auto',
    }
});

export default LoginScreen; 