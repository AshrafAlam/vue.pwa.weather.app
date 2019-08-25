import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyCSwiNAtbn8xXZEq6a0gQDAWxl7kgzSbDU",
    authDomain: "pwa-weather-app-e606f.firebaseapp.com",
    databaseURL: "https://pwa-weather-app-e606f.firebaseio.com",
    projectId: "pwa-weather-app-e606f",
    storageBucket: "pwa-weather-app-e606f.appspot.com",
    messagingSenderId: "24625099378",
    appId: "1:24625099378:web:00fef2539c8f0cc1"
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

db.enablePersistence({experimentalTabSynchronization:true});

export default {
  db
}