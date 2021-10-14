import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

//Make a file named react-firebase-sign-up-login.apikey.js that contains:
/////////////////////////////////////////////////////////////////////////
// export const localApiKey = {
//   apiKey: "Your firebase apiKey",
//   authDomain: "Your firebase authDomain",
//   projectId: "Your firebase projectID",
//   storageBucket: "Your firebase storageBucket",
//   messagingSenderId: "Your firebase messagingSenderId",
//   appId: "Your firebase appId",
// };
////////////////////////////////////////////////////////////////////////
import { localApiKey } from "./react-firebase-sign-up-login.apikey";

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = localApiKey;

const firebaseConfig = {
  apiKey,

  authDomain,

  projectId,

  storageBucket,

  messagingSenderId,

  appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Initialize Database
export const db = getFirestore(app);

//----WRITE a document with user uid in database if it does not exists.
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const newUserRef = collection(db, "users");
      await setDoc(doc(newUserRef, userAuth.uid), {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Could not create user.", error.message);
    }
  }

  return userRef;
};

export const auth = getAuth();

//Google authentication:
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //Always use pop-up when Google auth triggered

export const signInWithGoogle = () => signInWithPopup(auth, provider);

//export default firebase; //in case we want the whole library.
