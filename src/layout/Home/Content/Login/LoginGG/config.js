import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDX55f48sODJp0pIjEU7LCGtyvrtJJ0IRU",
  authDomain: "songs-cac58.firebaseapp.com",
  projectId: "songs-cac58",
  storageBucket: "songs-cac58.appspot.com",
  messagingSenderId: "401411539907",
  appId: "1:401411539907:web:066394cd9e7f744f75f376",
  measurementId: "G-14M9HZDFP9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
