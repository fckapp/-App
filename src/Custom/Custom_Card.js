import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import {Horizontalscale, verticalScale, moderateScale} from './Custom_Dimensions.js';

const { width, height } = Dimensions.get('window');


// 슬라이드 광고 카드
export const AdSlider = () => {
  const ads = [
    { id: '1', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/61/3b/24/route66-club.jpg?w=400&h=300&s=1', city: '방콕' , title: '루트66', desciption: '완전 멋있고 재밌어'},
    { id: '2', image: 'https://example.com/ad2.jpg', title: '여러분들의 광고를 기다립니다.', desciption: ''},
    { id: '3', image: 'https://example.com/ad3.jpg', title: '여러분들의 광고를 기다립니다.', desciption: ''},
    { id: '4', image: 'https://example.com/ad3.jpg', title: '여러분들의 광고를 기다립니다.', desciption: ''},
    { id: '5', image: 'https://example.com/ad3.jpg', title: '여러분들의 광고를 기다립니다.', desciption: ''},
    { id: '6', image: 'https://example.com/ad3.jpg', title: '여러분들의 광고를 기다립니다.', desciption: ''},
    { id: '7', image: 'https://example.com/ad3.jpg', title: '여러분들의 광고를 기다립니다.', desciption: ''},
    { id: '8', image: 'https://example.com/ad3.jpg', title: '여러분들의 광고를 기다립니다.1', desciption: ''},
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.AdSlider} activeOpacity={1}>
        <Image source={{ uri: item.image }} style={styles.AdSlider_image} />
        <View style={styles.overlay}>
            <View style={styles.cityBox}>
                <Text style={styles.city}>{item.city}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desciption}>{item.desciption}</Text>
        </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <FlatList
            data={ads}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true} // 수평 스크롤
            showsHorizontalScrollIndicator={false} // 스크롤바 숨기기
            snapToAlignment="center" // 스냅 기능을 사용하여 슬라이드 전환 시 자연스러움
            decelerationRate="normal" // 부드러운 스와이프 구현
            contentContainerStyle={styles.flatList} // FlatList의 내용 스타일 설정
        />
    </View>
  );
};

const styles = StyleSheet.create({

    //슬라이드 광고 카드 스타일
    container: {
        flex: 1,
    },
    flatList: {
        paddingLeft: Horizontalscale(20), // 양옆에 여백을 줘서 카드 사이에 공간을 마련
        paddingRight: Horizontalscale(10),
    },
    AdSlider: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        width: width - 200, // 카드 크기 설정
        height: verticalScale(180),
        marginRight: Horizontalscale(10),
        backgroundColor:'#cccccc'
    },
    AdSlider_image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        margin: 5,
    },
    cityBox: {
        width: 30,
        height: 30,
        backgroundColor:'#ffffff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    city: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '900',
    },
    title: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '900', 
        marginBottom: 5,
    },
    desciption: {
        color: '#FFFFFF', 
        fontSize: moderateScale(10),
    },
});
