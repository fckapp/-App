import React from "react";
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Horizontalscale, verticalScale, moderateScale } from "../Dimensions";
import FeatherIcon from 'react-native-vector-icons/Feather'; // Feather 아이콘

//아이콘 텍스트 버튼
export const IconTextButton = ({title, onPress, titleSize, titleColor, iconName, iconSize, iconColor}) => {
    return(
        <TouchableOpacity style={styles.TextButton} onPress={onPress} activeOpacity={0.7}>
            <Text style={[styles.TextButton_title, {color: titleColor, fontSize: titleSize}]}>{title}</Text>
            <FeatherIcon name={iconName} size={iconSize} color={iconColor}/>
        </TouchableOpacity>
    );
};


// 스타일 정의
const styles = StyleSheet.create({
    
    // 아이콘 텍스트 버튼 스타일
    TextButton : {
        paddingHorizontal: Horizontalscale(20),
        paddingVertical: verticalScale(12), // 세로 크기 조정
        alignItems: 'center',
        flexDirection: 'row',
    },
    TextButton_title: {
        fontSize: moderateScale(12),
    },

});