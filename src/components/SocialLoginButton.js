// 소셜 로그인 버튼 파일
import React from 'react';
import {View, Text, Button, Image, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';

const SocialLoginButton = ({title, icon, onPress, loading}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff"/>
            ) : (
                <>
                    <Image source={icon} style={styles.icon}/>
                    <Text style={styles.buttonText}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

// 버튼의 스타일 시트
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0C14B',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
    },
});

export default SocialLoginButton;