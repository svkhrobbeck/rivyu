import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Main
const firebaseConfig = {
  apiKey: "AIzaSyC5lLl2Ah18jjF2mohPBhk-HaYVQVwPh3g",
  authDomain: "kino-blog.firebaseapp.com",
  projectId: "kino-blog",
  storageBucket: "kino-blog.appspot.com",
  messagingSenderId: "119412215722",
  appId: "1:119412215722:web:16aa0dc0df485c64d025d3",
  measurementId: "G-6MT97BLPS0",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { db, auth, provider, storage };
