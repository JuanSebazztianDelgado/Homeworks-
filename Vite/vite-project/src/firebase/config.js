// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage" 
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set, push, onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDTNrTZzM8maG-OrCtZ1ggJP1-8Y3aCOOM",
  authDomain: "esda2-c188b.firebaseapp.com",
  projectId: "esda2-c188b",
  databaseURL: "https://esda2-c188b-default-rtdb.firebaseio.com/",
  storageBucket: "esda2-c188b.firebasestorage.app",
  messagingSenderId: "49496384785",
  appId: "1:49496384785:web:814b0193deb15fdef798b0",
  measurementId: "G-26M98FR2QC"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(); 
const firebaseStorage = getStorage(app)
const db = getDatabase()

export { auth, app, firebaseStorage, db, ref, set, push, onValue };
