import ShopActionTypes from './shop.types';

export const updateCollections = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});

export const loadCollectionsStart = () => ({
  type: ShopActionTypes.LOAD_COLLECTIONS_START,
});

export const loadCollectionsSuccess = () => ({
  type: ShopActionTypes.LOAD_COLLECTIONS_SUCCESS,
});
