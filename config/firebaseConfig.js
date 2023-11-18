
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiLNi4Jyp5V47QC86LqWdJWWe4C2SCyxQ",
  authDomain: "kindhands-aef71.firebaseapp.com",
  projectId: "kindhands-aef71",
  storageBucket: "kindhands-aef71.appspot.com",
  messagingSenderId: "1015001680992",
  appId: "1:1015001680992:web:cab5f3290b6eb9ef34c705",
  measurementId: "G-Z66G4DCCN4"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const storage = getStorage(app);

export default app;