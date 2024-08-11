// https://firebase.google.com/docs/web/setup#access-firebase
// https://firebase.google.com/docs/firestore/quickstart#web_1
// https://firebase.google.com/docs/firestore/manage-data/add-data
// https://stackoverflow.com/questions/62324667/firebaseerror-missing-or-insufficient-permissions-with-react-js "if false" removed for testing

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { Thought } from "../interfaces/thoughtInterface";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

var firebaseApp: any;
var firestoreDatabase: any;
let errorMessage: string | null = null;

export const firebaseController = {
  initialize(): void {
    firebaseApp = initializeApp(firebaseConfig);
    firestoreDatabase = getFirestore(firebaseApp);

    // check if the firebase app controller has been intialized
    if (!firebaseApp || !firestoreDatabase) {
      throw new Error(
        "Error has occured, failed to intialize Firebase App Controller."
      );
    }
    console.log(
      "Firebase App Controller and Database has been successfully intialized."
    );
  },

  async depositThought(thought: string): Promise<void> {
    try {
      console.log("Depositing thought: ", thought);

      // generate the ID for the thought first
      const thoughtRef = doc(collection(firestoreDatabase, "thoughts"));
      await setDoc(thoughtRef, {
        id: thoughtRef.id,
        userId: "placeholder", // all thoughts will have placeholder id for now
        thought: thought,
        date: new Date(),
      });

      console.log("Document written with ID: ", thoughtRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  },

  async withdrawThought(): Promise<Thought> {
    const thoughtsRef = collection(firestoreDatabase, "thoughts");
    const thoughtsSnapshot = await getDocs(thoughtsRef);
    const thoughts: Thought[] = [];

    thoughtsSnapshot.forEach((doc) => {
      thoughts.push(doc.data() as Thought);
    });

    // grab a random index from 0 to the length of the local storage
    const thoughtsLength = thoughts.length;
    const randomIndex = Math.floor(Math.random() * thoughtsLength);

    return thoughts[randomIndex];
  },

  async register(email: string, password: string): Promise<boolean> {
    const auth = getAuth();
    let userCredentials: any;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered successfully:", userCredential.user);
        // if successful, return true
        userCredentials = userCredential;
        return true;
      })
      .catch((error) => {
        console.log("Error during registration:", error.code, error.message);
        errorMessage = error.message;
        return false;
      });

    if (!userCredentials) {
      return false;
    } else {
        return true;
    }
  },

  async login(email: string, password: string): Promise<boolean> {
    const auth = getAuth();
    let userCredentials: any;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        userCredentials = userCredential;
        console.log("User logged in successfully:", user);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        errorMessage = error.message;
        console.log("Error during login:", errorCode, errorMessage);
        return false;
      });
      if (!userCredentials) {
        return false;
      } else {
          return true;
      }
  },

  // Method to get the error message
  getErrorMessage(): string | null {
    return errorMessage;
  },

  async signOut(): Promise<void> {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        console.log("Error during sign out:", error);
      });
  },
};
