// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6jmctPx4iOISyKgeh948ngNTYfMtKpLo",
  authDomain: "lovepets-a89b0.firebaseapp.com",
  databaseURL: "https://lovepets-a89b0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lovepets-a89b0",
  storageBucket: "lovepets-a89b0.appspot.com",
  messagingSenderId: "303006534501",
  appId: "1:303006534501:web:02bebbcf79d959ae3baf8c",
  measurementId: "G-FZ451LT3VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);