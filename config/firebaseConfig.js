// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc2S2EARZXfqb0t20rHJ9RvOKwl61L3zE",
  authDomain: "loginwithfirebase-dc6cb.firebaseapp.com",
  projectId: "loginwithfirebase-dc6cb",
  storageBucket: "loginwithfirebase-dc6cb.firebasestorage.app",
  messagingSenderId: "660841905126",
  appId: "1:660841905126:android:b49cb51a7634285109b427"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Storage
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
