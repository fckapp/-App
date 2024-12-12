import { initializeApp } from "firebase/app";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, APP_ID, MEASUREMENT_ID} from '@env';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
