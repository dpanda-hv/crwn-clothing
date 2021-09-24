const { initializeApp } = require('firebase/app');
const {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} = require('firebase/auth');
const {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  collection,
  writeBatch,
} = require('firebase/firestore');

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

const auth = getAuth();
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);
  let snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      snapShot = await getDoc(userRef);
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return snapShot;
};

const addCollectionAndDocuments = async (collectionKey, documentsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);

  const batch = writeBatch(firestore);

  documentsToAdd.forEach((docToAdd) => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, docToAdd);
  });

  return await batch.commit();
};

const convertCollectionsToMap = (collections) => {
  return collections.reduce((acc, collection) => {
    acc[collection.routeName] = collection;
    return acc;
  }, {});
};

const getCollectionsFromSnapshot = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections;
};

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

module.exports = {
  auth,
  firestore,
  googleProvider,
  signInWithGoogle,
  addCollectionAndDocuments,
  createUserProfileDocument,
  getCollectionsFromSnapshot,
  convertCollectionsToMap,
  getCurrentUser,
};
