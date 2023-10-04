/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiyvs3JwuJk_kdOq0FLTi6poOaPqBOhH0",
  authDomain: "kamus-bpjph.firebaseapp.com",
  projectId: "kamus-bpjph",
  storageBucket: "kamus-bpjph.appspot.com",
  messagingSenderId: "950541522950",
  appId: "1:950541522950:web:bded6e6fa079e9e0174b87",
  measurementId: "G-8355F0YMXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);