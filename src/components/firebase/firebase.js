// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6kUUt6_Vv7qhphqdwNHcwn2-dkErxwZ8",
  authDomain: "academates-53fe5.firebaseapp.com",
  projectId: "academates-53fe5",
  storageBucket: "academates-53fe5.appspot.com",
  messagingSenderId: "491257844248",
  appId: "1:491257844248:web:306e7dd8293fd12a0c296d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
