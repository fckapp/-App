import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import { useNavigation } from '@react-navigation/native';
import { useNickName } from '../Firebase/Services_NicknameContext';  // NickNameContext import

export const HomeCustomHeader = () => {
    const navigation = useNavigation();
    const { nickName, profileImage } = useNickName();  // NickNameContext에서 값 가져오기
    
    return (
        // 전체 컨테이너
        <View style={styles.container}>
            {/* 로고, 알림 아이콘 컨테이너 */}
            <View style={styles.subContainer}>
                {/* 사용자 프로필 이미지 및 닉네임 */}
                <View style={styles.profileContainer}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.ProfileImage} />
                    ) : (
                        <View style={styles.defaultImage}></View> // 이미지가 없을 경우 기본 스타일
                    )}
                    <Text style={styles.nickName}>{nickName ? `${nickName}님` : '반갑습니다.'}</Text>
                </View>
                {/* 아이콘 컨테이너 */}
                <View style={styles.iconsContainer}>
                    {/* 검색 아이콘 */}
                    <TouchableOpacity onPress={() => navigation.navigate('검색')}>
                        <FeatherIcon name="search" size={22} color="#000" />
                    </TouchableOpacity>
                    {/* 알림 아이콘 */}
                    <TouchableOpacity onPress={() => navigation.navigate('알림')}>
                        <FeatherIcon name="bell" size={22} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// 검색 아이콘 헤더 기능 (검색 스크린으로 이동)
export const SearchIconButton = () => {
    const navigation = useNavigation();  // useNavigation 훅을 여기서 사용
    return (
        <TouchableOpacity onPress={() => navigation.navigate('검색')} style={styles.IconButton} activeOpacity={1}>
            <FeatherIcon name="search" size={22} color="#000" />
        </TouchableOpacity>
    );
};


// 설정 아이콘 헤더 기능 (설정 스크린으로 이동)
export const SettingIconButton = () => {
    const navigation = useNavigation();  // useNavigation 훅을 여기서 사용
    return (
        <TouchableOpacity onPress={() => navigation.navigate('설정')} style={styles.IconButton} activeOpacity={1}>
            <FeatherIcon name="settings" size={22} color="#000" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // 홈 커스텀 
    container: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff', // 배경 색상 추가
        marginTop: 20,
    },
    subContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // 중앙 정렬
        paddingHorizontal: 20, // 좌우 패딩 추가
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10,
    },
    defaultImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    nickName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    logo: {
        width: 100,
        height: 50, // 로고 크기 조절
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60, // 아이콘 간격 조절
    },


    // 아이콘 버튼
    IconButton: {
        width: 45,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    }
});
