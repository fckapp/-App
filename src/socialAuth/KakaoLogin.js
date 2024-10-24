import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { snsSaveUser, findUserBySocialId } from '../services/LocalDB'


WebBrowser.maybeCompleteAuthSession();

// 카카오톡 API KEY
const KaKaoAPIKey = 'e522986bde232ab5bae789bb458362d1';

// 카카오톡 로그인 함수
/* `export` is a keyword in JavaScript used to export functions, objects, or values from a module so
that they can be imported and used in other modules. In the code snippet provided, the `export`
keyword is used to make the `easyKakaoLogin` and `fetchUserInfo` functions accessible for import in
other parts of the application. This allows other modules to use these functions by importing them
using `import` statements. */
export const easyKakaoLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
    });

    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KaKaoAPIKey}&redirect_uri=${redirectUri}&response_type=code`;

    const result = await AuthSession.startAsync({ authUrl })
    // 로그인 성공시 토큰 반환
    if (result.type === 'success') {
        const { code } = result.params;
        const  accessToken = await fetchAccessToken(code);
        const userInfo = await fetchUserInfo(accessToken);

        // 사용자 정보를 DB에 저장 (이부분 조심 나중에 문제 있을 경우 userInfo.id <= user_social_id 로 변경 해보세요)
        const existingUser = await findUserBySocialId(userInfo.id);
        if (existingUser.length === 0) {
            await snsSaveUser({
                user_social_id: userInfo.id,
                createdAt: new Date(),
            });
        }
    // 로그인 실패시 에러 메세지
    } else {
        throw new Error('로그인에 실패 하였습니다. 다시 시도해 주세요');
    }
};

// 사용자 카카오톡 토큰 가져오는 함수
const fetchAccessToken = async (code) => {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&client_id=${KaKaoAPIKey}&redirect_uri=${redirectUri}&code=${code}`,
    });

    const data = await response.json();
    return data.accessToken; //토큰 반환
};

// 사용자 정보 가져오는 함수
export const fetchUserInfo = async (accessToken) => {
    const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const response = await fetch(userInfoUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // 정상적으로 불러오지 못했을 시 오류문구 출력
    if (!response.ok) {
        throw new Error('사용자님의 정보를 가져오는데 실패 하였습니다. 다시 시도해 주세요.')
    }
    const data = await response.json();
    return data;
};