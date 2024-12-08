// 카카오톡, 네이버, 인스타, 애플 간편 로그인 및 일반 로그인 & 회원가입
import React, {useState } from 'react';
import {View, Image, StyleSheet, Text, SafeAreaView, Alert} from 'react-native';
import { easyKaKaoLogin } from '../Auth/Auth_KaKaoLogin.js';
import { easyGoogleLogin } from '../Auth/Auth_GoogleLogin.js';
import { Horizontalscale, verticalScale, moderateScale } from '../Components/Custom_Dimensions.js';
import { useNavigation } from '@react-navigation/native';
import { CustomLoadinghalf } from '../Components/Custom_Loading.js';
import {SocialLoginButton, TextButton} from '../Components/Custom_Button.js';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../Redux/Reducers_auth.js';

// 로그인 스크린 시작
const LoginScreen = ({ route }) => {

    const navigation = useNavigation();
     // 로그인 진행을 알수있는 로딩
    const { onLoginSuccess, onLoginError } = route.params; // props에서 가져오기
    const [Loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 소셜 로그인 성공여부 
    const handleLogin = async(loginFunction) => {
        setLoading(true);
        try {
            const success = await loginFunction();
            
            if(success) {
                onLoginSuccess();
            } else {
                onLoginError();
                Alert.alert('로그인에 실패 하셨습니다.');
            }
        } catch (error) {
            console.log('로그인 에러:', error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 회원가입 스크린으로 이동
    const HandleRegister =() => {
        navigation.navigate("회원가입");
    }

    // 일반로그인 스크린으로 이동
    const HandleEmailLogin = () => {
        navigation.navigate("일반로그인", {onLoginSuccess, onLoginError});
    };

    // 카카오, 네이버, 인스타, 애플 간편로그인 버튼
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageLogoContainer}>
                <Image
                    source={require('../assets/images/로그인_화면.jpg')}
                    style={styles.loginLogo}
                    resizeMode='contain'
                />
            </View>

            <Text style={styles.comment}>태국 여행은{'\n'}이리타여와 함께</Text>

            {/* 소셜로그인 (카카오, 구글, 네이버, 페이스북) 버튼 컨테이너 */}
            <View style={styles.socialLoginContainer}>


                {/* 카카오톡 로그인 버튼 */}
                <SocialLoginButton 
                    onPress={() => handleLogin(easyKaKaoLogin)}
                    logoSource={require('../assets/images/카카오_로그인.png')}
                    title='카카오로 시작하기'
                    titleColor='#000000'
                    buttonColor='#FEE500' 
                />


                {/* 구글 로그인 버튼 */}
                <SocialLoginButton 
                    onPress={() => handleLogin(easyGoogleLogin)}
                    logoSource={require('../assets/images/구글_로그인.png')}
                    title='구글로 시작하기'
                    titleColor='#000000'
                    buttonColor='#FFFFFF' 
                />


                {/* 네이버 로그인 버튼 */}
                <SocialLoginButton 
                    onPress={() => handleLogin('')}
                    logoSource={require('../assets/images/네이버_로그인_로고.png')}
                    title='네이버로 시작하기'
                    titleColor='#FFFFFF'
                    buttonColor='#03C75A' 
                />


                {/* 페이스북 로그인 버튼 */}
                <SocialLoginButton 
                    onPress={() => handleLogin('')}
                    logoSource={require('../assets/images/페이스북_로그인.png')}
                    title='페이스북 시작하기'
                    titleColor='#FFFFFF'
                    buttonColor='#5890FF' 
                />
    
            </View>


            {/* 일반 이메일 로그인 및 회원가입  */}
            <View style={styles.commonLoginContainer}>


                {/* 일반 이메일 로그인 버튼 */}
                <TextButton
                    title='로그인'
                    onPress={() => HandleEmailLogin()}
                    titleColor="#949494"
                />

                {/* 일반 이메일 회원가입 버튼 */}
                <TextButton
                    title='회원가입'
                    onPress={() => HandleRegister()}
                    titleColor="#949494"
                />
        
            </View>
            {Loading && <CustomLoadinghalf/>}
        </SafeAreaView>
    );
};

// 스타일 시트 시작
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: Horizontalscale(30),
    },
    imageLogoContainer: {
        width: '100%',
        height: verticalScale(250),
    },
    loginLogo: {
        width: '100%',
        height: '100%',
    },
    comment: {
        fontSize: moderateScale(20),
        textAlign: 'center',
        fontWeight: 'bold',
        height: verticalScale(100),
    },
    socialLoginContainer: {
        width: '100%',
        height: verticalScale(180),
        justifyContent: 'space-between'
    },
    
    // 일반 이메일 로그인 or 회원가입
    commonLoginContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    emailButton: {
        width: 'auto'
    },
});

export default LoginScreen;