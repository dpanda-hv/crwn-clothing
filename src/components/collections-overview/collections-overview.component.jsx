import React from 'react';
import { useSelector } from 'react-redux';

import { selectShopCollectionsList } from '../../redux/shop/shop.selector';
import CollectionPreview from '../collection-preview/collection-preview.component';
import './collections-overview.styles.scss';

const CollectionsOverview = () => {
  const collections = useSelector(selectShopCollectionsList(4));
  return (
    <div className="collections-preview">
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} isPreview {...otherProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
