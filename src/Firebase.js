// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClb0z5XetEYmXN0-FsrKM5EL9maNFZq8k",
  authDomain: "codepen-cc699.firebaseapp.com",
  projectId: "codepen-cc699",
  storageBucket: "codepen-cc699.appspot.com",
  messagingSenderId: "521471822349",
  appId: "1:521471822349:web:8cbb4ca1cf599304386344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);