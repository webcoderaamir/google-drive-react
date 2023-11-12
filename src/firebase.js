// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2u5jx2D4eJavUSpkfsFtSNdKllr1UeVw",
  authDomain: "drive-clone-bd7c9.firebaseapp.com",
  projectId: "drive-clone-bd7c9",
  storageBucket: "drive-clone-bd7c9.appspot.com",
  messagingSenderId: "81946199170",
  appId: "1:81946199170:web:654f04d5efb6d6cba5e09b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
export default firebase;
