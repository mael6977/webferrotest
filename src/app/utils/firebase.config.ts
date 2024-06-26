import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { environment } from "../environments/environment";

const firebaseConfig = {
    apiKey: environment.API_KEY,
    authDomain: environment.AUTH_DOMAIN,
    projectId: environment.PROJECT_ID,
    storageBucket: environment.STORAGE_BUCKET,
    messagingSenderId: environment.MESSAGING_SENDER_ID,
    appId: environment.APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
