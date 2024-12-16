// firebase.ts
import { initializeApp } from 'firebase/app'; // For initializing Firebase app
import { getFirestore } from 'firebase/firestore'; // For Firestore
import { getStorage } from 'firebase/storage'; // For Storage

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAPkUztEpAB-hNsUEREDuEs2-W6c201WlQ",
  authDomain: "task2-07.firebaseapp.com",
  projectId: "task2-07",
  storageBucket: "task2-07.firebasestorage.app",
  messagingSenderId: "659983759644",
  appId: "1:659983759644:web:066a05d8ce235d85d6e2d9",
  measurementId: "G-63BKZFEH2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
