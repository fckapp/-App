import { SocialLoginButton } from "@shared/ui/index.js";

export const NaverLoginButton = () => {
    return (
        <SocialLoginButton
            buttonColor={'#03C75A'}
            title={'네이버로 시작하기'}
            titleColor={'#FFFFFF'}
            logoSource={require('@assets/images/네이버_로그인_로고.png')}
            onPress={''}
        />
    );
};