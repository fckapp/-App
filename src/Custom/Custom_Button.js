import React from "react";
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { Horizontalscale, verticalScale, moderateScale } from './Custom_Dimensions.js';

//일반 텍스트 버튼
export const TextButton = ({title, onPress, titleColor}) => {
    return(
        <TouchableOpacity style={styles.TextButton} onPress={onPress} activeOpacity={0.7}>
            <Text style={[styles.TextButton_title, {color: titleColor}]}>{title}</Text>
        </TouchableOpacity>
    );
};


// 박스 텍스트 버튼
export const BoxButton = ({onPress, title ,titleColor, buttonColor}) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={0.7}
            style={[styles.BoxButton, {backgroundColor: buttonColor}]}
        >
            <Text style={[styles.BoxButton_title, {color: titleColor}]}>{title}</Text>
        </TouchableOpacity>
    );
};


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


// 이미지 버튼
export const ImageButton = ({onPress, imageSource, title, titleColor, imageWidth, imagehight}) => {
    return(
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.ImageButton}>
            <Image source={imageSource} style={[{width: imageWidth}, {height: imagehight}]} resizeMode="contain"/>
            <Text style={[styles.ImageButton_title, {color: titleColor}]}>{title}</Text>
        </TouchableOpacity> 
    );
};


// 아이콘 텍스트 버튼 
// export const IconButton = ({onPress, Icon})



// 스타일 정의
const styles = StyleSheet.create({
    
    // 일반 텍스트 버튼 스타일
    TextButton : {
        paddingHorizontal: Horizontalscale(20),
        paddingVertical: verticalScale(12), // 세로 크기 조정
        alignItems: 'center',
    },
    TextButton_title: {
        fontSize: moderateScale(10),
    },

    // 박스 텍스트 버튼 스타일
    BoxButton: {
        paddingHorizontal: Horizontalscale(20),
        paddingVertical: verticalScale(12), // 세로 크기 조정
        alignItems: 'center',
        borderRadius: 10,
    },
    BoxButton_title: {
        fontSize: moderateScale(12),
        fontWeight: 'bold',
    },

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

    //이미지 버튼 스타일
    ImageButton: {
        flexDirection: 'column',
        alignItems: 'center',
        width: Horizontalscale(50),
    },
    ImageButton_title: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: 'bold',
    },

});