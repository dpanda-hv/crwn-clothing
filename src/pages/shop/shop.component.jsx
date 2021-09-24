import React from 'react';
import { Route } from 'react-router-dom';

import { default as CollectionsOverview } from '../../components/collections-overview/collections-overview.container';
import { default as Collections } from '../collection/collection.container';

const Shop = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={Collections} />
    </div>
  );
};

export default Shop;
