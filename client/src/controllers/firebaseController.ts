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
  query,
  orderBy,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { Thought } from "../interfaces/thoughtInterface";
import { Reply } from "../interfaces/replyInterface";

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

      // Get the currently signed-in user
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        const thoughtRef = doc(collection(firestoreDatabase, "thoughts"));
        await setDoc(thoughtRef, {
          id: thoughtRef.id,
          userId: "Guest",
          thought: thought,
          date: new Date(),
          karma: 0,
        });
      }

      // Generate the ID for the thought first
      const thoughtRef = doc(collection(firestoreDatabase, "thoughts"));
      await setDoc(thoughtRef, {
        id: thoughtRef.id,
        userId: user!.uid, // Use the signed-in user's ID
        thought: thought,
        date: new Date(),
        karma: 0,
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

  // used to get thoughts for listing
  async getThoughts(): Promise<Thought[]> {
    const thoughtsRef = query(
      collection(firestoreDatabase, "thoughts"),
      orderBy("date", "desc")
    );
    const thoughtsSnapshot = await getDocs(thoughtsRef);
    const thoughts: Thought[] = [];

    thoughtsSnapshot.forEach((doc) => {
      thoughts.push(doc.data() as Thought);
    });

    // sort the thoughts by date created
    // thoughts.sort((a, b) => {
    //   return new Date(b.date).getTime() - new Date(a.date).getTime();
    // });

    return thoughts;
  },

  async getThoughtById(thoughtId: string): Promise<Thought> {
    const thoughtsRef = collection(firestoreDatabase, "thoughts");
    const thoughtsSnapshot = await getDocs(thoughtsRef);
    let thought: Thought | null = null;

    thoughtsSnapshot.forEach((doc) => {
      const thoughtData = doc.data() as Thought;
      if (thoughtData.id === thoughtId) {
        thought = thoughtData;
      }
    });

    if (!thought) {
      throw new Error("Thought not found.");
    }

    return thought;
  },

  async getUserVote(thoughtId: string): Promise<string> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user signed in. Must be signed in to vote.");
      return "";
    }

    const db = getFirestore();
    const voteRef = doc(collection(db, "votes"), `${user.uid}_${thoughtId}`);
    const voteDoc = await getDoc(voteRef);
    if (voteDoc.exists()) {
      return voteDoc.data().voteType;
    } else {
      return "";
    }
  },

  async voteThought(thought: Thought, newVoteType: string): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user signed in. Must be signed in to vote.");
      return;
    }

    const db = getFirestore();
    const thoughtRef = doc(db, "thoughts", thought.id);
    const voteRef = doc(collection(db, "votes"), `${user.uid}_${thought.id}`); // check if user has voted on this thought

    try {
      const voteDoc = await getDoc(voteRef);
      // If the user has voted on this thought before
      if (voteDoc.exists()) {
        const existingVote = voteDoc.data().voteType;
        if (newVoteType == "" && existingVote != "") {
          // User is voting for the same vote type again, undo the vote
          console.log("null case");
          if (existingVote === "upvote") {
            await setDoc(thoughtRef, { karma: thought.karma - 1 }, { merge: true });
          } else if (existingVote === "downvote") {
            await setDoc(thoughtRef, { karma: thought.karma + 1 }, { merge: true });
          }
        } else if (newVoteType !== "" && existingVote != "") {
          // User is voting for the opposite vote type, undo the previous vote
          console.log("undoing case");
          console.log("existingVote: ", existingVote);
          console.log("newVoteType: ", newVoteType);
          if (existingVote === "upvote") {
            console.log("test");
            await setDoc(thoughtRef, { karma: thought.karma - 2 }, { merge: true });
          } else if (existingVote === "downvote") {
            await setDoc(thoughtRef, { karma: thought.karma + 2 }, { merge: true });
          }
        }
       else {
        // User is voting for the first time
        if (newVoteType === "upvote") {
          await setDoc(thoughtRef, { karma: thought.karma + 1 }, { merge: true });
        } else if (newVoteType === "downvote") {
          await setDoc(thoughtRef, { karma: thought.karma - 1 }, { merge: true });
        }
      }
    }
      // Save the new vote
      await setDoc(voteRef, {
        userId: user.uid,
        thoughtId: thought.id,
        voteType: newVoteType,
      });
    } catch (error) {
      console.log("Error processing vote: ", error);
      return;
    }
  },

  async replyThought(thought: Thought, reply: string): Promise<void> {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        const replyRef = doc(collection(firestoreDatabase, "replies"));
        await setDoc(replyRef, {
          id: replyRef.id,
          userId: "Guest",
          thoughtId: thought.id,
          reply: reply,
          date: new Date(),
        });
      }
      const replyRef = doc(collection(firestoreDatabase, "replies"));
      await setDoc(replyRef, {
        id: replyRef.id,
        userId: user!.uid,
        thoughtId: thought.id,
        reply: reply,
        date: new Date(),
      });

      console.log("Document written with ID: ", replyRef.id);
    } catch (error) {
      console.error("Error replying to thought: ", error);
    }
  },

  async getReplies(thought: Thought): Promise<Reply[]> {
    const repliesRef = query(
      collection(firestoreDatabase, "replies"),
      orderBy("date", "desc")
    );
    const repliesSnapshot = await getDocs(repliesRef);
    const replies: Reply[] = [];

    repliesSnapshot.forEach((doc) => {
      const reply = doc.data() as Reply;
      if (reply.thoughtId === thought.id) {
        replies.push(reply);
      }
    });

    // sort the replies by date created
    // replies.sort((a, b) => {
    //   return new Date(b.date).getTime() - new Date(a.date).getTime();
    // });

    return replies;
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
        
        switch (error.code) {
            case "auth/weak-password": {
                errorMessage = "Password is too weak.\nA password must contain at least 6 characters, one uppercase letter, one number, and one special character.";
                break;
            }
            case "auth/invalid-email": {
                errorMessage = "Invalid email address. Please try again.";
                break;
            }
            case "auth/email-already-in-use": {
                errorMessage = "Email already in use. Please try another email.";
                break;
            }
            default: {
                errorMessage = error.message;
                break;
            }
        }

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
