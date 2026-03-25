import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAC8_ZRFsZxckwWud6tsQmn17fKNQRbTWU",
  authDomain: "brian-crea.firebaseapp.com",
  projectId: "brian-crea",
  storageBucket: "brian-crea.firebasestorage.app",
  messagingSenderId: "901855866255",
  appId: "1:901855866255:web:7b1f0ece5a25efb08f2ffa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function initFirebase() {
  await signInAnonymously(auth);
  return { auth, db };
}

export { auth, db, initFirebase, collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp };
