import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, SafeAreaView, View } from 'react-native'; // SafeAreaView 추가
import BottomTab from './src/components/BottomTab.js'; // BottomTab 경로 확인
import SplashScreen from './src/screens/SplashScreen.js';
import LoginScreen from './src/screens/LoginScreen.js';


const App =() => {
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsLoading(false); // 3초 후에 로딩 완료
//         }, 3000);

//         return () => clearTimeout(timer); // 클린업
//     }, []);

//     if (isLoading) {
//         return <SplashScreen />; // 로딩 중에는 SplashScreen 표시
//     }

    return (
        <View>
            <LoginScreen />
        </View>
    );

    // return (
    //     <SafeAreaView style={{ flex: 1 }}>
    //         <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    //         <NavigationContainer>
    //             <BottomTab />
    //         </NavigationContainer>
    //     </SafeAreaView>
    // );
};

export default App;
