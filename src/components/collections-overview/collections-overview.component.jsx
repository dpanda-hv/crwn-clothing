import React from 'react';
import { connect } from 'react-redux';

import { selectShopCollectionsList } from '../../redux/shop/shop.selector';
import CollectionPreview from '../collection-preview/collection-preview.component';
import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
  <div className="collections-preview">
    {collections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  collections: selectShopCollectionsList(4)(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
