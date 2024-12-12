import React, { useEffect} from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from './src/app/navigation/AppNavigator.js';
import { WEBClientId_KEY } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Provider } from 'react-redux';
import { ToastAlert } from '@features/alert/model/index.js';
import { toastConfig } from '@features/alert/model/index.js';
import { db, app, auth, storage, store } from 'src/app/inedx.js';
import Toast from 'react-native-toast-message';


const App = () => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEBClientId_KEY, // Firebase Console의 OAuth 2.0 클라이언트 ID
        });
    }, []);
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                    <AppNavigation /> {/* AppNavigation 컴포넌트 사용 */}
                    <ToastAlert />
                    <Toast config={toastConfig} /> {/* Toast 설정 적용 */}
                </SafeAreaView>
            </Provider>
        </GestureHandlerRootView>
    );
  };
  
export default App;