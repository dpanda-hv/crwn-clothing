import React from 'react';
import { connect } from 'react-redux';

import { selectShopCollection } from '../../redux/shop/shop.selector';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import './collection.styles.scss';

const Collection = ({ collection: { title, items } }) => (
  <div className="collection-page">
    <CollectionPreview title={title} items={items} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectShopCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(Collection);
