// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importar el módulo de autenticación

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTNrTZzM8maG-OrCtZ1ggJP1-8Y3aCOOM",
  authDomain: "esda2-c188b.firebaseapp.com",
  projectId: "esda2-c188b",
  storageBucket: "esda2-c188b.firebasestorage.app",
  messagingSenderId: "49496384785",
  appId: "1:49496384785:web:814b0193deb15fdef798b0",
  measurementId: "G-26M98FR2QC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // Exportar la instancia de autenticación