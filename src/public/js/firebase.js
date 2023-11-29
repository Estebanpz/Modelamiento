import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA2FdC1D8M0hi9n24xaDqog0ss1Vnc4rkA",
    authDomain: "septimo-semestre.firebaseapp.com",
    projectId: "septimo-semestre",
    storageBucket: "septimo-semestre.appspot.com",
    messagingSenderId: "85459388800",
    appId: "1:85459388800:web:672c9a604a6694c08d1965"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  /** 
   * @param {string} funcion
  */

  export const guardarFuncion = async(funcion) =>{
    await addDoc(collection(db, "funciones"),{expresion: funcion})
  }

  export const obtenerFunciones = async(callback) =>{
    await onSnapshot(collection(db, "funciones"), await callback);
  }