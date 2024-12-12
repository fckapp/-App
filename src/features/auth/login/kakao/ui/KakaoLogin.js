import React from 'react';
import { KaKaoLoginLogic } from '../model/KakaoLoginLogic.js';
import { SocialLoginButton } from '@shared/ui/index.js';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure} from '@entities/auth/index.js';

export const KakoLoginButton = () => {
    const dispatch = useDispatch();

    const handleKakaoLogin = async() => {
        dispatch(loginStart('kakao'));

        try {
            const email = await KaKaoLoginLogic();
            dispatch(loginSuccess(email));
            console.log('로그인 성공', email);

        } catch (error) {
            dispatch(loginFailure(error.message));
            console.log('로그인 실패', error);
        }
    };

    return (
        <SocialLoginButton 
            onPress={handleKakaoLogin}
            logoSource={require('@assets/images/카카오_로그인.png')}
            title='카카오로 시작하기'
            titleColor={'#000000'}
            buttonColor={'#FEE500'}
        />

    )
};
