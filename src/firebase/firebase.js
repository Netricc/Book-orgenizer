// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZD40JJzfGzULItfBsPofOM41NAsJ8hFM",
  authDomain: "readly-auth.firebaseapp.com",
  projectId: "readly-auth",
  storageBucket: "readly-auth.appspot.com",
  messagingSenderId: "257883175289",
  appId: "1:257883175289:web:26e87f7d29c5db06cf97a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

// Optionally, export the app to use it elsewhere in your React app
export {app, auth };
