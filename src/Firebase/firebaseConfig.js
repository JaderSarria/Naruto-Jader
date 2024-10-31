// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAY67HZfFtW_lhFF0tttLd70LEp4JtArM",
  authDomain: "proyectoweb2024-d8813.firebaseapp.com",
  projectId: "proyectoweb2024-d8813",
  storageBucket: "proyectoweb2024-d8813.appspot.com",
  messagingSenderId: "253166705359",
  appId: "1:253166705359:web:b0006fca14b2461560f5ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
