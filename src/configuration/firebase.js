import Firebase from 'firebase';
const FIREBASE_API_KEY = 'AIzaSyBr6gTFmivlIYXVfvyucZ_JDfkDkEBwJA4';
const MESSAGING_SENDER_ID = '1090465431247';
const APP_ID = '1:1090465431247:web:c9a49dad12139c9d7a41ba';
const FIREBASE_PROJECT_ID = 'taskmanage-ca5f2';
const FIREBASE_URL = 'https://todoreact-9cfe7.firebaseio.com';
const MESUAREMENT_ID = '"G-25VXED352T';
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "https://taskmanage-ca5f2.firebaseapp.com",
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: "taskmanage-ca5f2.appspot.com",
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MESUAREMENT_ID
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();