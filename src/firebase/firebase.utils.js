import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAqDlhumB4bgowDDdne_r6yf9TjBv_1vto",
    authDomain: "crwn-db-7e6a8.firebaseapp.com",
    databaseURL: "https://crwn-db-7e6a8.firebaseio.com",
    projectId: "crwn-db-7e6a8",
    storageBucket: "crwn-db-7e6a8.appspot.com",
    messagingSenderId: "877038548066",
    appId: "1:877038548066:web:6caef948cf58428bf2cd3b",
    measurementId: "G-MXRSY3MTXK"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

     const userRef = firestore.doc(`users/${userAuth.uid}`);
     const snapShot = await userRef.get();
     if(!snapShot.exists){
       const { displayName, email } = userAuth;
       const createdAt = new Date();

       try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
       }catch(error) {
          console.log('error creating user', error.message);
       }
     }

     return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

