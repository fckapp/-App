import { SocialLoginButton } from "@shared/ui/index.js";

export const FacebookLoginButton = () => {
    return(
        <SocialLoginButton
            buttonColor={'#5890FF' }
            logoSource={require('@assets/images/페이스북_로그인.png')}
            onPress={''}
            title={'페이스북으로 시작하기'}
            titleColor={'#FFFFFF'}
        />
    );
}