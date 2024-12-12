import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const CustomLoadingful = () => {

    return (
        <View style={styles.loadingful_Wrapper}>
            <View style={styles.loading_box}>
                <ActivityIndicator size="large" color="#87cefa" />
            </View>
        </View>
    )
};

export const CustomLoadinghalf = () => {
    return (
        <View style={styles.loadinghalf_Wrapper}>
            <View style={styles.loading_box}>
                <ActivityIndicator size="large" color="#87cefa" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingful_Wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        zIndex: 10, // 로딩 화면이 다른 UI 위에 오도록 설정
      },
      loadinghalf_Wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10, // 로딩 화면이 다른 UI 위에 오도록 설정
      },
      loading_box: {
        width: 70,
        height: 70,
        elevation: 1,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      },
});