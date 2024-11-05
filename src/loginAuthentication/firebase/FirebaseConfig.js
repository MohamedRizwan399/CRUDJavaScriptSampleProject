import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA4PMq3lAHMoh0xCAuRq3_bpFM3crrUXM",
  authDomain: "javascriptcrudsampletask-react.firebaseapp.com",
  projectId: "javascriptcrudsampletask-react",
  storageBucket: "javascriptcrudsampletask-react.firebasestorage.app",
  messagingSenderId: "424905758834",
  appId: "1:424905758834:web:ec891037c4d9855df00aeb",
  measurementId: "G-VMY0GT9XM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
