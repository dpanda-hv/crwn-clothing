import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopCollectionsList = (limit) =>
  createSelector([selectShopCollections], (collections) =>
    limit
      ? Object.values(collections).map((collection) => ({
          ...collection,
          items: collection.items.filter((_, idx) => idx < limit),
        }))
      : Object.values(collections)
  );

export const selectShopCollection = (collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
  );
