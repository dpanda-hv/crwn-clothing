import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDnd1gRfurbdsI4vaZxuF2p4VHZKT8cnZA',
  authDomain: 'crwn-db-328c5.firebaseapp.com',
  projectId: 'crwn-db-328c5',
  storageBucket: 'crwn-db-328c5.appspot.com',
  messagingSenderId: '154723808743',
  appId: '1:154723808743:web:0271d62a12bb565505f942',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  documentsToAdd
) => {
  const collectionRef = collection(firestore, collectionKey);

  const batch = writeBatch(firestore);

  documentsToAdd.forEach((docToAdd) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, docToAdd);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((acc, collection) => {
    acc[collection.routeName] = collection;
    return acc;
  }, {});
};
