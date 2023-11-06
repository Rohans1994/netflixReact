// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOIc3fd3dhmbcUuzMAnxfSynt4dwiYnCw",
  authDomain: "netflixgpt-d1905.firebaseapp.com",
  projectId: "netflixgpt-d1905",
  storageBucket: "netflixgpt-d1905.appspot.com",
  messagingSenderId: "688982665649",
  appId: "1:688982665649:web:97f49b6e9691fe36413590",
  measurementId: "G-GDLPMC33ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();