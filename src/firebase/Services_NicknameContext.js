// src/context/NickNameContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage} from './Firebase_Firestore.js';

// 닉네임 상태와 관련된 Context 생성
const NickNameContext = createContext();

export const NickNameProvider = ({ children }) => {
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      setNickName(user.displayName || '');
      setProfileImage(user.photoURL || null);
    }

    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setNickName(user.displayName || '');
        setProfileImage(user.photoURL || null);
      } else {
        setNickName('');
        setProfileImage(null);
      }
    });

    return () => unsubscribe(); // 구독 해제
  }, []);

  // Firebase Storage에 이미지를 업로드하고 URL 반환하는 함수
  const uploadProfileImage = async (uri) => {
    const fileName = uri.split('/').pop(); // 로컬 이미지 파일 이름 추출
    const storageRef = ref(storage, 'profileImages/' + fileName); // Firebase Storage에 저장할 경로

    const response = await fetch(uri); // 로컬 파일 경로에서 데이터를 가져옵니다.
    const blob = await response.blob(); // Blob 형태로 변환

      try {
          // Firebase Storage에 이미지 업로드
          await uploadBytes(storageRef, blob);
          // 업로드된 이미지 URL 가져오기
          const imageUrl = await getDownloadURL(storageRef);
          return imageUrl; // 업로드된 이미지 URL 반환
      } catch (error) {
          console.error('Error uploading image: ', error);
          throw new Error('이미지 업로드 실패');
      }
  };

  const updateNickNameAndProfile = async (newNickName, newProfileImage) => {
    setNickName(newNickName);
    setProfileImage(newProfileImage);

    const user = auth().currentUser;
    if (user) {
        try {
            // Firebase Storage에 이미지를 업로드하고 URL 가져오기
            const uploadedImageUrl = await uploadProfileImage(newProfileImage);

            // 사용자 프로필 업데이트
            await user.updateProfile({
                displayName: newNickName,
                photoURL: uploadedImageUrl, // Firebase Storage에서 가져온 URL 사용
            });

            console.log('프로필 업데이트 성공');
        } catch (error) {
            console.log('프로필 업데이트 오류:', error);
        }
    }
  };

  
  const updateProfileImage = async (newProfileImage) => {
    setProfileImage(newProfileImage);

    const user = auth().currentUser;
    if (user) {
        try {
            // Firebase Storage에 이미지를 업로드하고 URL 가져오기
            const uploadedImageUrl = await uploadProfileImage(newProfileImage);

            // 사용자 프로필 업데이트
            await user.updateProfile({
                photoURL: uploadedImageUrl, // Firebase Storage에서 가져온 URL 사용
            });

            console.log('프로필 이미지 업데이트 성공');
        } catch (error) {
            console.log('프로필 이미지 업데이트 오류:', error);
        }
    }
  };


  // 닉네임만 업데이트
  const updateNickName = (newNickName) => {
    setNickName(newNickName);

    const user = auth().currentUser;
    if(user) {
      user.updateProfile({
        displayName: newNickName,
      }).catch((error) => {
        console.log('프로필 업데이트 오류:', error);
      });
    }
  };

  return (
    <NickNameContext.Provider value={{ nickName, profileImage, updateNickNameAndProfile, updateProfileImage, updateNickName}}>
      {children}
    </NickNameContext.Provider>
  );
};

export const useNickName = () => useContext(NickNameContext);
