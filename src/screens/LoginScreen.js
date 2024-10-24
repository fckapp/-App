// 카카오톡, 네이버, 인스타, 애플 간편 로그인 및 일반 로그인 & 회원가입
import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text, SafeAreaView, Button, Alert} from 'react-native';

const { width } = Dimensions.get('window'); // 화면 너비와 높이 가져오기

// 로그인 스크린 시작
const LoginScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* 로고 이미지 박스 */}
            <View style={styles.imageLogo}>
                {/* 로고 이미지 */}
                <Image source={require('../../assets/Login_logo.jpg')}
                    style={styles.loginLogo}
                    resizeMode='contain'
                />
            </View>
            <View>
                <Text style={styles.comment}>동남아 여행은{"\n"}이리타여와 함께</Text>
            </View>
        </SafeAreaView>
    );
};

// 스타일 시트 시작
const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLogo: {
        width: width,
        height: 250,
        paddingTop: 100,
    },
    loginLogo: {
        width: '100%',
        height: '100%',
    },
    comment: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export default LoginScreen; 