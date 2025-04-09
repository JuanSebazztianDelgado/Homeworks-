import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './config';


export const doSignInEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


export const doSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};


export const doSignOut = () => {
  return signOut(auth);
};