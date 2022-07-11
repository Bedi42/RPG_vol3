import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFdjb7tTNQS_nzFHmY1j40XvvdE2sBUkE",
  authDomain: "rpg-app-bc47c.firebaseapp.com",
  projectId: "rpg-app-bc47c",
  storageBucket: "rpg-app-bc47c.appspot.com",
  messagingSenderId: "608462207973",
  appId: "1:608462207973:web:480afd157624e4e272cd0c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// const colRef = collection(db, "characters");

// getDocs(colRef)
//   .then((snapshot) => {
//     let characters = [];
//     snapshot.docs.forEach((doc) => {
//       characters.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(characters);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

export const auth = getAuth(app);
