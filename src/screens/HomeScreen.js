import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import HomeCustomHeader from '../components/HomeCustomHeader';
// import Carousel from 'react-native-snap-carousel';

const HomeScreen = () => {
    const { width, height } = Dimensions.get('window'); // 화면 너비와 높이 가져오기

    return (
        <SafeAreaView style={styles.container}>
            {/* 커스텀 앱바 상단 */}
            <HomeCustomHeader />
            {/* 홈스크린 Body 부분 */}
            <View style={styles.content}>
                <Text style={styles.title}>메인 화면</Text>
                <Text>너비: {width}px</Text>
                <Text>높이: {height}px</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default HomeScreen;


