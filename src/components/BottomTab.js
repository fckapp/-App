// 홈 스크린, 찜 스크린, 일정 스크린, 커뮤니티 스크린, 마이 스크린 바텀 네비게이터 컴포넌트
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';  // Text import 추가
import HomeScreen from '../screens/HomeScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MyPageScreen from '../screens/MyPageScreen';
import Icon from 'react-native-vector-icons/Feather';


const Tab = createBottomTabNavigator();

const BottomTab = () => {
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
                        <Icon name='home' color={focused ? '#000000' : '#cccccc'} size={size}/>
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color : focused ? '#000000' : '#cccccc'}}>홈</Text>
                    ),
                }} />
            {/* 찜 스크린 */}
            <Tab.Screen
                name="찜"
                component={WishlistScreen}
                options={{
                    tabBarIcon: ({color, focused, size}) => (
                        <Icon name='heart' color={focused ? '#000000' : '#cccccc'} size={size}/>
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color : focused ? '#000000' : '#cccccc'}}>찜</Text>
                    ),
                }} />
            {/* 일정 스크린 */}
            <Tab.Screen
                name="일정"
                component={ScheduleScreen} 
                options={{
                    tabBarIcon: ({color, focused, size}) => (
                        <Icon name='plus-square' color={focused ? '#000000' : '#cccccc'} size={size}/>
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color : focused ? '#000000' : '#cccccc'}}>일정</Text>
                    ),
                }} />
            {/* 커뮤니티 스크린 */}
            <Tab.Screen
            name="커뮤니티"
            component={CommunityScreen} 
            options={{
                tabBarIcon: ({color, focused, size}) => (
                    <Icon name='globe' color={focused ? '#000000' : '#cccccc'} size={size}/>
                ),
                tabBarLabel: ({focused}) => (
                    <Text style={{color : focused ? '#000000' : '#cccccc'}}>커뮤니티</Text>
                ),
            }} />
            {/* 마이페이지 스크린 */}
            <Tab.Screen
            name="마이페이지"
            component={MyPageScreen}
            options={{
                tabBarIcon: ({color, focused, size}) => (
                    <Icon name='smile' color={focused ? '#000000' : '#cccccc'} size={size}/>
                ),
                tabBarLabel: ({focused}) => (
                    <Text style={{color : focused ? '#000000' : '#cccccc'}}>마이</Text>
                ),
            }} />
        </Tab.Navigator>
    );
};

export default BottomTab;

