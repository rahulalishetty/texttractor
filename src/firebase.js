import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyB6H2NW8f9v1AiJXtomK1_BeY330xEAq6w",
  authDomain: "texttractive.firebaseapp.com",
  databaseURL: "https://texttractive.firebaseio.com",
  projectId: "texttractive",
  storageBucket: "texttractive.appspot.com",
  messagingSenderId: "793819022735"
};
firebase.initializeApp(config);
// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child("todos");
