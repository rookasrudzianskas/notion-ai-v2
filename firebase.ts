import {initializeApp, getApps, getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBpaeUIlgi-B1NCFQWBKXIGh5SVUOtw2Q",
  authDomain: "rookas-notion-ai.firebaseapp.com",
  projectId: "rookas-notion-ai",
  storageBucket: "rookas-notion-ai.appspot.com",
  messagingSenderId: "458558829242",
  appId: "1:458558829242:web:34aa9aac70100dd6b2c883",
  measurementId: "G-VQJH1TXN9M"
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};
