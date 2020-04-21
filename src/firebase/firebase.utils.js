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

/* This utility was used to upload the original data for this project
into firestore */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//First step is create a new collection in firestore named collectionKey

const collectionRef = firestore.collection(collectionKey);
console.log(collectionRef);

//Do the following upload in a batch so that new collection is not 
//corrupted if there is a failure in the upload process.
const batch = firestore.batch();
//step through each of the objects to upload and 
//make each a new document in the created collection.
objectsToAdd.forEach(obj => {
  const newDocRef = collectionRef.doc();
  batch.set(newDocRef, obj);
});

return await batch.commit()
};

/* --Only the title and items are stored in the array of documents that are fetched
 as a snapshot from the firestore collection named: "collections". 
 --First step is walk through the array of documents and create a new 
  array of objects structured the way we want access the here in this app. */

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
/* Second step is to convert the array into an object */
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;