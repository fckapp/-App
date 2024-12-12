import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { KakoLoginButton, GoogleLoginButton, NaverLoginButton, FacebookLoginButton} from 'src/features/auth/login/index.js';
import { Horizontalscale, verticalScale, moderateScale, TextButton, IconTextButton } from '@shared/ui/index.js';
import { navigateToPage } from '@shared/lib/index.js';

export const LoginPage = ({navigation}) => {

  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.commentBox}>
        <Text style={styles.comment}>태국 여행은{'\n'}이리타여와 함께!</Text>
      </View>

      <View style={styles.socaialLogin_button}>
        {/* 카카오 로그인 버튼 */}
        <KakoLoginButton />

        {/* 구글 로그인 버튼 */}
        <GoogleLoginButton />

        {/* 네이버 로그인 버튼 */}
        <NaverLoginButton />

        {/* 페이스북 로그인 버튼 */}
        <FacebookLoginButton />
      </View> 
      <View style={styles.IconTextButton}>

        {/* 이메일 로그인 버튼 */}
        <IconTextButton
          onPress={() => navigateToPage(navigation, 'emailLogin')}
          title={"이메일로 시작하기"}
          titleSize={12}
          titleColor={'#000000'}
          iconName={'chevron-right'}
          iconSize={20}
          iconColor={'#000000'} 
        />
      </View>

      <View style={styles.TextButton}>
        {/* 회원가입 버튼 */}
        <TextButton 
          onPress={() => navigateToPage(navigation, 'register')}
          title={"아직 계정이 없으신가요?"}
          titleSize={12}
          titleColor={'#000000'}
        />
      </View>
    </SafeAreaView > 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  commentBox: {
    paddingVertical: 50,
  },
  comment: {
    fontSize: moderateScale(24),
    textAlign: 'center',
    fontWeight: 'bold',
    height: 100,
  },
  socaialLogin_button: {
    height: 250,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  IconTextButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  TextButton: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    bottom: 20,
  },
});

