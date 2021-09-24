const { collection, doc, getDoc, getDocs } = require('firebase/firestore');

const {
  getCollectionsFromSnapshot,
  convertCollectionsToMap,
  firestore,
} = require('../firebase');

const getCollections = async () => {
  try {
    const collectionRef = collection(firestore, 'collections');
    const snapshot = await getDocs(collectionRef);
    const collectionsMap = await getCollectionsFromSnapshot(snapshot);
    return collectionsMap;
  } catch (error) {
    console.error(error.message);
  }
};

const getCollectionById = async (id) => {
  try {
    const docRef = doc(firestore, 'collections', `${id}`);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      throw 'No such document!';
    }
  } catch (error) {
    console.error(error.message);
  }
};

const getCollectionByTitle = (title) => {
  return getCollections().then((collections) => {
    return convertCollectionsToMap(collections)[title.toLowerCase()];
  });
};

module.exports = { getCollections, getCollectionById, getCollectionByTitle };
