// DB에 정보 정장 조회 파일
import {firestore} from './Firebase.js';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

// 소셜 회원가입자의 데이터 저장하는 로직
export const snsSaveUser = async(data) => {
    try {
        const snsData_save = await addDoc (collection(firestore, "users"), data);
        console.log("Document written with ID:", snsData_save.id);
    } catch (error) {
        console.error('Error 사용자 정보 저장 실패:', error);
    }
};

//소셜 회원가입자의 id를 조회하는 로직
export const snsFindUser = async(socialId) => {
    try {
        const findUser = collection(firestore, "users");
        const find = query(findUser, where("socialId", "==", socialId));
        const querySnapshot = await getDocs(find);

        const existingUser = querySnapshot.docs.map(doc => ({ userId: doc.id, ...doc.data()}));
        return existingUser; // 추가된 반환
    } catch (error) {
        console.error('Error 사용자 조회 실패:', error);
        return [];
    }
};
