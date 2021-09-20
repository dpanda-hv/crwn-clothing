import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectShopCollection } from '../../redux/shop/shop.selector';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import './collection.styles.scss';

const Collection = () => {
  const { collectionId } = useParams();
  const { title, items } = useSelector(selectShopCollection(collectionId));

  return (
    <div className="collection-page">
      <CollectionPreview title={title} items={items} />
    </div>
  );
};

export default Collection;
