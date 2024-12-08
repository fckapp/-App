import React from 'react-native';
import { View, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/로그인_화면.jpg')} // 경로 확인
                style={styles.image}
                resizeMode='contain'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87cefa',
    },
    image: {
        width: 400,
        height: 400,
        marginBottom: 20,
    },
});

export default SplashScreen;