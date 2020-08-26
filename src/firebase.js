import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAb19trOV2vgeXqpsJdiBiUtqC1dvZRWSA",
  authDomain: "facebook-messanger-clone-9145d.firebaseapp.com",
  databaseURL: "https://facebook-messanger-clone-9145d.firebaseio.com",
  projectId: "facebook-messanger-clone-9145d",
  storageBucket: "facebook-messanger-clone-9145d.appspot.com",
  messagingSenderId: "21511457721",
  appId: "1:21511457721:web:d93fa427f95f632ff48468",
  measurementId: "G-8C94PZMF13",
});

const db = firebaseApp.firestore();

export default db;
