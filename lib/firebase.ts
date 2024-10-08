import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAQKkQDEEpnvPOVjh6VL4QG6Y37r8I7HRY",
    authDomain: "perceptive-lamp-390021.firebaseapp.com",
    projectId: "perceptive-lamp-390021",
    storageBucket: "perceptive-lamp-390021.appspot.com",
    messagingSenderId: "911642380961",
    appId: "1:911642380961:web:ebd6ac61455b5a0cedbee0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };