import React from "react";
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { Horizontalscale, verticalScale, moderateScale } from "../Dimensions.js";

// 소셜 로그인 버튼
export const SocialLoginButton = ({onPress, logoSource, title, titleColor, buttonColor}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.7} 
            style={[styles.SocialLoginButton, {backgroundColor: buttonColor}]}
        >
            <Image source={logoSource} style={styles.SocialLoginButton_logo} resizeMode="contain"/>
            <Text style={[styles.SocialLoginButton_title, {color: titleColor}]}>{title}</Text>
        </TouchableOpacity>
    );
};


// 스타일 정의
const styles = StyleSheet.create({
    
    // 소셜로그인 버튼 스타일
    SocialLoginButton: {
        paddingHorizontal: Horizontalscale(20),
        paddingVertical: verticalScale(12), // 세로 크기 조정
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: '#CCCCCC', // 투명 회색
        borderWidth: 0.5,
    },
    SocialLoginButton_logo: {
        width: 20,
        height: 20,
        marginRight: Horizontalscale(24),
    },
    SocialLoginButton_title: {
        fontSize: moderateScale(12),
        fontWeight: 'bold',
    },

});