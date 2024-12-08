import React from "react";
import { Linking, Text, View, Platform} from "react-native";

// Bolt 앱 열기
export const openBoltApp = () => {
  const boltUrl = `bolt://`;

  Linking.openURL(boltUrl).then((supported)=> {
      if(supported) {
          Linking.openURL(boltUrl).catch((error) => {
              console.error('볼트 앱을 열수 없음.:', error);
          });
      } else {
          // 앱이 설치되지 않았을 경우 스토어 페이지로 이동
          openBoltStore();
      }
  }).catch((error) => {
      console.error('url을 열 수 없음', error);
  });
};

// Bolt 앱 스토어로 이동 (앱이 없으면)
export const openBoltStore = () => {
  const storeUrl =
    Platform.OS === 'ios'
      ? 'https://apps.apple.com/kr/app/bolt-request-a-ride/id675033630' // iOS URL (아이폰 앱)
      : 'https://play.google.com/store/apps/details?id=ee.mtakso.client&hl=ko&pli=1'; // Android URL (안드로이드 앱)

  Linking.openURL(storeUrl).catch((error) => {
    console.error('스토어로 이동할 수 없습니다:', error);
  });
};



// Grab 앱 열기
export const openGrabApp = () => {
  const grabUrl = `grab://`; 

  Linking.canOpenURL(grabUrl)
      .then((supported) => {
          if (supported) {
              Linking.openURL(grabUrl).catch((error) => {
              console.error('Grab 앱을 열 수 없습니다:', error);
      });
      } else {
          openGrabStore(); // 앱이 설치되지 않았으면 스토어로 이동
      }
  })
      .catch((error) => {
      console.error('URL 스킴을 열 수 없습니다:', error);
  });
};


// Grab 앱 스토어로 이동 (앱이 없으면)
export const openGrabStore = () => {
  const storeUrl =
    Platform.OS === 'ios'
      ? 'https://apps.apple.com/kr/app/grab-driver-app-for-partners/id1257641454' // iOS URL (아이폰 앱)
      : 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger&hl=ko'; // Android URL (안드로이드 앱)

  Linking.openURL(storeUrl).catch((error) => {
    console.error('스토어로 이동할 수 없습니다:', error);
  });
};