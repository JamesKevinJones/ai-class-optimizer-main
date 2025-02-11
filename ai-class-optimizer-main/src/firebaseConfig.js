// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT9kDSzmO50L3XP8mWSmNsY5vcDLUmxdw",
  authDomain: "time-table-scheduler-17206.firebaseapp.com",
  projectId: "time-table-scheduler-17206",
  storageBucket: "time-table-scheduler-17206.firebasestorage.app",
  messagingSenderId: "701130116172",
  appId: "1:701130116172:web:693690681cd2a9507bb8e9",
  measurementId: "G-VJVE82P84T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);