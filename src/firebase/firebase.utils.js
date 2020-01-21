import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyDiekLuNY2Btp55zoRVm6lJLN6tadPgvhc",
    authDomain: "crwn-db-ea545.firebaseapp.com",
    databaseURL: "https://crwn-db-ea545.firebaseio.com",
    projectId: "crwn-db-ea545",
    storageBucket: "crwn-db-ea545.appspot.com",
    messagingSenderId: "743700411631",
    appId: "1:743700411631:web:ae3dbb7d53bd01df07571a",
    measurementId: "G-HYKZZRD751"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
          console.log('Error creating user', error.message);
      }
    }

    return userRef;

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account '});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;