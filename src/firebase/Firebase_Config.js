// 파이어베이스 초기화
import { initializeApp } from "firebase/app";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, APP_ID, MEASUREMENT_ID} from '@env';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };