import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// 커스텀 관련 임포트
import {HomeCustomHeader} from '../Components/Custom_Header.js';
import { Horizontalscale ,verticalScale } from '../Components/Custom_Dimensions.js';
// 모달 관련 임포트
import { NickName } from '../modal/Modal.js';
import {ImageButton} from '../Components/Custom_Button.js';
import {AdSlider} from '../Components/Custom_Card.js';
import {ContentTitle} from '../Components/Custom_Text.js';

const HomeScreen = () => {
    const navigation = useNavigation();

    // 새로 고침 상태 관리
    const [refreshing, setRefreshing] = useState(false);

    const categoryHandler = (category) => {
        navigation.navigate('핫플', { category });
    };

    // 새로 고침 함수
    const onRefresh = () => {
        setRefreshing(true);
        // 여기에 데이터를 새로 로드하는 로직을 추가하세요
        setTimeout(() => {
            setRefreshing(false);  // 새로 고침이 완료되면 상태를 false로 설정
        }, 2000);  // 예시로 2초 후에 새로 고침을 종료
    };

    return (
        
        <SafeAreaView style={styles.container}>
            {/* 커스텀 앱바 상단 */}
            <HomeCustomHeader />

            {/* 새로고침 */}
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollViewContent}  // contentContainerStyle로 수정
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >

                {/* 광고 */}
                <View style={styles.ads}>

                </View>

                {/* 컨텐츠 아이템 리스트 메인 Wrapper */}
                <View style={styles.section_1}>
                    {/* 클럽 */}
                    <ImageButton 
                        onPress={() => categoryHandler('클럽')}
                        imageSource={require('../assets/images/클럽.png')}
                        imageWidth={30}
                        imagehight={30}
                        title='클럽'
                        titleColor='#000000'
                    />

                    {/* 술집 */}
                    <ImageButton 
                        onPress={() => categoryHandler('술집')}
                        imageSource={require('../assets/images/술집.png')}
                        imageWidth={30}
                        imagehight={30}
                        title='술집'
                        titleColor='#000000'
                    />

                    {/* 관광지 */}
                    <ImageButton 
                        onPress={() => categoryHandler('관광지')}
                        imageSource={require('../assets/images/관광지.png')}
                        imageWidth={30}
                        imagehight={30}
                        title='관광지'
                        titleColor='#000000'
                    />

                    {/* 맛집 */}
                    <ImageButton 
                        onPress={() => categoryHandler('맛집')}
                        imageSource={require('../assets/images/맛집.png')}
                        imageWidth={30}
                        imagehight={30}
                        title='맛집'
                        titleColor='#000000'
                    />

                    {/* 시장 */}
                    <ImageButton 
                        onPress={() => categoryHandler('시장')}
                        imageSource={require('../assets/images/시장.png')}
                        imageWidth={30}
                        imagehight={30}
                        title='시장'
                        titleColor='#000000'
                    />
                </View>

                
                
                
                {/* 구분선 */}
                <View style={styles.isolation_line} />

                {/* 클럽 TOP10 박스 */}
                <View style={styles.section_2}>
                    <ContentTitle
                        title={'핫핫🔥 추천 클럽'}
                    />
                    <AdSlider />
                </View>

                {/* 구분선 */}
                <View style={styles.isolation_line} />

                {/* 술집 TOP10 박스 */}
                <View style={styles.section_2}>
                    <ContentTitle
                        title={'달콤한🌸 추천 술집'}
                    />
                    <AdSlider />
                </View>

                {/* 구분선 */}
                <View style={styles.isolation_line} />

                {/* 관광지 TOP10 박스 */}
                <View style={styles.section_2}>
                    <ContentTitle
                        title={'편안한🏞️ 추천 관광지'}
                    />
                    <AdSlider />
                </View>

                {/* 구분선 */}
                <View style={styles.isolation_line} />

                {/* 맛집 TOP10 박스 */}
                <View style={styles.section_2}>
                    <ContentTitle
                        title={'꿀맛🍴 추천 맛집'}
                    />
                    <AdSlider />
                </View>

                {/* 구분선 */}
                <View style={styles.isolation_line} />

                {/* 맛집 TOP10 박스 */}
                <View style={styles.section_2}>
                    <ContentTitle
                        title={'시끌벅적🛒 추천 시장'}
                    />
                    <AdSlider />
                </View>

                {/* 광고 */}
                <View style={styles.ads}>

                </View>



            </ScrollView>
            {/* 닉네임 설정 */}
            <NickName />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: 20,
    },
    scrollViewContent: {  // contentContainerStyle에 필요한 스타일 추가
        paddingBottom: 30,  // 스크롤 끝에서 여백을 추가
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    // 경계선 스타일
    isolation_line: {
        width: '100%',
        borderWidth: 5,
        borderColor: '#EAEAEA',
    },

    // 광고 스타일
    ads: {
        width: '90%',
        height: 100,
        paddingVertical: verticalScale(10),
        backgroundColor: '#949494',
        marginHorizontal: 20,
        borderRadius: 10,
    },

    // section_1 (클럽, 술집, 관광지, 맛집, 시장 아이콘 버튼) 스타일
    section_1: {
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Horizontalscale(20),
        paddingVertical: verticalScale(10),
        margin: 20,
    },
    

    // section_2 (인기명소)
    section_2: {
        paddingVertical: 20,
    },
});

export default HomeScreen;
