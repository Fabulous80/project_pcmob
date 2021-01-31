import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "  ",
  authDomain: "  ",
  databaseURL: "  ",
  projectId: " ",
  storageBucket: " ",
  messagingSenderId: " ",
  appId: "  ",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
