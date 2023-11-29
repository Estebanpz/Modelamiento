import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2FdC1D8M0hi9n24xaDqog0ss1Vnc4rkA",
  authDomain: "septimo-semestre.firebaseapp.com",
  projectId: "septimo-semestre",
  storageBucket: "septimo-semestre.appspot.com",
  messagingSenderId: "85459388800",
  appId: "1:85459388800:web:672c9a604a6694c08d1965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export{
  app,
  auth,
  db
}