import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-DULtWdNIqC3eMy_hdVNb4FnjdKJ48J4",
  authDomain: "rpg-v2.firebaseapp.com",
  projectId: "rpg-v2",
  storageBucket: "rpg-v2.appspot.com",
  messagingSenderId: "663412292602",
  appId: "1:663412292602:web:0892ecc7dacc13bcddc243",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

const colRef = collection(db, "characters");

getDocs(colRef)
  .then((snapshot) => {
    let characters = [];
    snapshot.docs.forEach((doc) => {
      characters.push({ ...doc.data(), id: doc.id });
    });
    console.log(characters);
  })
  .catch((err) => {
    console.log(err.message);
  });

export const auth = getAuth(app);
