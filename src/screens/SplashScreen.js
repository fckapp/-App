import React from 'react-native';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Main_logo.jpg')} // 경로 확인
                style={styles.image}
                resizeMode='contain'
            />
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 400,
        marginBottom: 20,
    },
});

export default SplashScreen;
