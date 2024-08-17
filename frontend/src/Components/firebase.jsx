// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB7_1JlTl-66zVonCMzf8Ep6EROIQ64Ww",
  authDomain: "digitiser-uit.firebaseapp.com",
  projectId: "digitiser-uit",
  storageBucket: "digitiser-uit.appspot.com",
  messagingSenderId: "715244453234",
  appId: "1:715244453234:web:3deafdc1b0cef2624331eb",
  measurementId: "G-X8RFL5SKDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
// const analytics = getAnalytics(app);

