import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFdjb7tTNQS_nzFHmY1j40XvvdE2sBUkE",
  authDomain: "rpg-app-bc47c.firebaseapp.com",
  projectId: "rpg-app-bc47c",
  storageBucket: "rpg-app-bc47c.appspot.com",
  messagingSenderId: "608462207973",
  appId: "1:608462207973:web:480afd157624e4e272cd0c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
