// 홈 스크린, 찜 스크린, 일정 스크린, 커뮤니티 스크린, 마이 스크린 바텀 네비게이터 컴포넌트
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';  // Text import 추가
import HomeScreen from '../screens/Screen_Home.js';
import WishlistScreen from '../screens/Screen_heart.js';
import ScheduleScreen from '../screens/Screen_Schedule.js';
import CommunityScreen from '../screens/Screen_Community.js';
import MyPageScreen from '../screens/Screen_MyPage.js';
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘
import { useNavigation } from '@react-navigation/native';
import {HomeCustomHeader, SettingIconButton, SearchIconButton} from './Custom_Header.js';


const Tab = createBottomTabNavigator();


const BottomTab = () => {
    const navigation = useNavigation()

    return (
        // 기본 화면은 홈화면
        <Tab.Navigator initialRouteName='홈'>

            {/* 홈스크린 */}
            <Tab.Screen 
                name="홈" 
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, focused, size}) => (
                        <FontAwesomeIcon name='suitcase' color={focused ? '#87cefa' : '#cccccc'} size={size}/>
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color : focused ? '#87cefa' : '#cccccc', fontSize: 10}}>메인홈</Text>
                    ),
                }} />

            {/* 찜 스크린 */}
            <Tab.Screen
                name="찜"
                component={WishlistScreen}
                options={{
                    tabBarIcon: ({color, focused, size}) => (
                        <FontAwesomeIcon name='heart' color={focused ? '#E76F92' : '#cccccc'} size={size}/>
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color : focused ? '#E76F92' : '#cccccc', fontSize: 10}}>찜목록</Text>
                    ),
                    headerTitle: '찜',
                    headerTitleStyle: {fontSize: 16, fontWeight: 'bold'}
                }} />

            {/* 일정 스크린 */}
            <Tab.Screen
                name="일정"
                component={ScheduleScreen} 
                options={{
                    tabBarIcon: ({color, focused, size}) => (
                        <FontAwesomeIcon name='plus-square' color={focused ? '#87cefa' : '#cccccc'} size={size}/>
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color : focused ? '#87cefa' : '#cccccc', fontSize: 10}}>일정관리</Text>
                    ),
                    headerTitle: '일정',
                    headerTitleStyle: {fontSize: 16, fontWeight: 'bold'}
                }} />

            {/* 커뮤니티 스크린 */}
            <Tab.Screen
            name="커뮤니티"
            component={CommunityScreen} 
            options={{
                tabBarIcon: ({color, focused, size}) => (
                    <FontAwesomeIcon name='globe' color={focused ? '#87cefa' : '#cccccc'} size={size}/>
                ),
                tabBarLabel: ({focused}) => (
                    <Text style={{color : focused ? '#87cefa' : '#cccccc', fontSize: 10}}>커뮤니티</Text>
                ),
                headerTitle: '커뮤니티',
                headerTitleStyle: {fontSize: 16, fontWeight: 'bold'}
            }} />

            {/* 마이페이지 스크린 */}
            <Tab.Screen
            name="마이페이지"
            component={MyPageScreen}
            options={{
                tabBarIcon: ({color, focused, size}) => (
                    <FeatherIcon name='smile' color={focused ? '#87cefa' : '#cccccc'} size={size}/>
                ),
                tabBarLabel: ({focused}) => (
                    <Text style={{color : focused ? '#87cefa' : '#cccccc', fontSize: 10}}>마이</Text>
                ),
                headerTitle: '마이페이지',
                headerTitleStyle: {fontSize: 16, fontWeight: 'bold'},
                headerRight: () => (<SettingIconButton/>),
            }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    setting_botton: {
        marginRight: 20,
    },
});

export default BottomTab;