import React from 'react';
import { GoogleLoginLogic } from '../api/GoogleLoginApi';
import { loginStart, loginSuccess, loginFailure } from '@entities/auth/index.js';
import { SocialLoginButton } from '@shared/ui/index.js';
import { useDispatch } from 'react-redux';
import { showAlert } from '@entities/alert/index.js';


export const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async() => {
        dispatch( loginStart('google'));
        try {
            const user = await GoogleLoginLogic();
            dispatch(loginSuccess(user));
            dispatch(showAlert({
                type: 'success',
                text1: '반가워요👋',
                text2: '이리타여에 오신것을 환영합니다.'
            }))

        } catch (error) {
            dispatch(loginFailure(error.message));
            dispatch(showAlert({
                type: 'error',
                text1: '구글 로그인을 다시 시도해 주세요.',
            }))
        }
    };

    return(
        <SocialLoginButton
            onPress={handleGoogleLogin}
            buttonColor={'#FFFFFF'}
            logoSource={require('@assets/images/구글_로그인.png')}
            title={'구글로 시작하기'}
            titleColor={'#000000'}
        />
    );
};