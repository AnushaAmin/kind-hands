// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiLNi4Jyp5V47QC86LqWdJWWe4C2SCyxQ",
  authDomain: "kindhands-aef71.firebaseapp.com",
  projectId: "kindhands-aef71",
  storageBucket: "kindhands-aef71.appspot.com",
  messagingSenderId: "1015001680992",
  appId: "1:1015001680992:web:cab5f3290b6eb9ef34c705",
  measurementId: "G-Z66G4DCCN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;