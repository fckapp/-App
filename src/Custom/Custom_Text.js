import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Horizontalscale, verticalScale, moderateScale } from './Custom_Dimensions.js';


// content 메인 title
export const ContentTitle =({title}) => {
    return(
        <View style={styles.contentTitle}>
            <Text style={styles.contentTitle_text}>{title}</Text>
        </View>
    )    
};

const styles = StyleSheet.create({
    contentTitle: {
        paddingHorizontal: Horizontalscale(20),
        marginBottom: verticalScale(10),
    },
    contentTitle_text: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000000',
    },
});