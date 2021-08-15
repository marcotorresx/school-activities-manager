import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBIyRyw0BuQjNsttGfhwRuGYhBpw-7A0vc",
    authDomain: "est57actividades.firebaseapp.com",
    projectId: "est57actividades",
    storageBucket: "est57actividades.appspot.com",
    messagingSenderId: "738176778667",
    appId: "1:738176778667:web:0121d517ecb421c79352ee"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export { db }