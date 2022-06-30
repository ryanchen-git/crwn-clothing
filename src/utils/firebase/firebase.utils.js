import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-mVJK9Mc_ax0gTyMyiSigEu0-plkl3l8',
  authDomain: 'crwn-clothing-db-fccaf.firebaseapp.com',
  projectId: 'crwn-clothing-db-fccaf',
  storageBucket: 'crwn-clothing-db-fccaf.appspot.com',
  messagingSenderId: '661529909677',
  appId: '1:661529909677:web:9db889b6bd2a646533a924',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  //console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  //console.log(userSnapShot);
  //console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
