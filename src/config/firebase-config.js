import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdRl7fL80OqX9blQO_sa-DUqRwCnmc2TY",
    authDomain: "pdf-searcher-14273.firebaseapp.com",
    projectId: "pdf-searcher-14273",
    storageBucket: "pdf-searcher-14273.appspot.com",
    messagingSenderId: "212009016279",
    appId: "1:212009016279:web:10b0bce1b19d1a094fc992"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();


