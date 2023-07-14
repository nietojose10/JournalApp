// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJsRebGrG7d1Jsikkxwupq2CnhGBUaARs",
  authDomain: "react-cursos-cee28.firebaseapp.com",
  projectId: "react-cursos-cee28",
  storageBucket: "react-cursos-cee28.appspot.com",
  messagingSenderId: "881411196547",
  appId: "1:881411196547:web:1f39978d876371f2e5fdb6"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const firebaseDB = getFirestore( FirebaseApp );