// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCk5pd_y8M-a4A4pCAt5sW9bETbElXPWk0",
    authDomain: "twelve-studio.firebaseapp.com",
    projectId: "twelve-studio",
    storageBucket: "twelve-studio.firebasestorage.app",
    messagingSenderId: "438193938291",
    appId: "1:438193938291:web:3f71fd16ec2d1f735eef06",
    measurementId: "G-VDTVJEXSN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);