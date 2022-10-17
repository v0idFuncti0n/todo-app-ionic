import firebase from "firebase";
import initializeApp = firebase.initializeApp;

const firebaseConfig = {
    apiKey: "AIzaSyBYfeGmuSunvReAOBWUyKnw8BeQcNrZO1c",
    authDomain: "todo-app-7eb4b.firebaseapp.com",
    databaseURL: "https://todo-app-7eb4b-default-rtdb.firebaseio.com",
    projectId: "todo-app-7eb4b",
    storageBucket: "todo-app-7eb4b.appspot.com",
    messagingSenderId: "1062212645640",
    appId: "1:1062212645640:web:e4f147a1d4d68c609a72bd"
};

const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp }