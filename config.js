import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAKh3cE4AIZAaZnAFkLP3fzlI2D-EZuw5E",
    authDomain: "elib-dbe65.firebaseapp.com",
    projectId: "elib-dbe65",
    storageBucket: "elib-dbe65.appspot.com",
    messagingSenderId: "8487899470",
    appId: "1:8487899470:web:aea505c4176578e6400e1f"
};
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();