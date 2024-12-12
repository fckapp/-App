import React from "react";
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Horizontalscale, verticalScale, moderateScale } from "../Dimensions";


// 박스 텍스트 버튼
export const CompleteButton = ({onPress, title ,titleColor, buttonColor, disabled }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={0.7}
            style={[styles.BoxButton, { backgroundColor: disabled ? '#D3D3D3' : buttonColor }]}
            disabled={disabled}
        >
            <Text style={[styles.BoxButton_title, {color: titleColor}]}>{title}</Text>
        </TouchableOpacity>
    );
};

// 스타일 정의
const styles = StyleSheet.create({

    // 박스 텍스트 버튼 스타일
    BoxButton: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    BoxButton_title: {
        fontSize: 16,
        fontWeight: 'bold',
    },

});