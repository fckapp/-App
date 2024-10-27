// 홈 스크린 상단 AppBar 커스텀 컴포넌트
import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const HomeCustomHeader = () => {
    return (
        // 전체 컨테이너
        <View style={styles.Container}> 
            {/* //로고, 알림, 설정 아이콘 컨테이너 */}
            <View style={styles.SubContainer}> 
                {/* 로고 이미지 */}
                <Image
                    source={require('../../assets/Home_logo.png')}
                    style={styles.Logo}
                />
                {/* 알람 및 설정 아이콘 */}
                <View style={styles.IconsContainer}>
                    <Icon name="search" size={20} color={'#000000'}/>
                    <Icon name="bell" size={20} color={'#000000'}/>
                    <Icon name="settings" size={20} color={'#000000'}/>
                </View>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff', // 배경 색상 추가
    },
    SubContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // 중앙 정렬
        paddingHorizontal: 20, // 좌우 패딩 추가
    },
    Logo: {
        width: 100,
        height: 50, // 로고 크기 조절
    },
    IconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100, // 아이콘 간격 조절
    },
});

export default HomeCustomHeader;