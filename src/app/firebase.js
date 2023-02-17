// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC7HFZL6UIsi1cZHZkMS-KAtHSQLt-qJew",

  authDomain: "project-social-923a2.firebaseapp.com",

  databaseURL: "https://project-social-923a2-default-rtdb.firebaseio.com",

  projectId: "project-social-923a2",

  storageBucket: "project-social-923a2.appspot.com",

  messagingSenderId: "823960909578",

  appId: "1:823960909578:web:5c77455415470d525d2cf3",

  measurementId: "G-4ZB73RC827"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);