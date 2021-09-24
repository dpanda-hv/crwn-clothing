import React from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import './collection.styles.scss';

const Collection = ({ collections: { title, items } }) => {
  return (
    <div className="collection-page">
      <CollectionPreview title={title} items={items} />
    </div>
  );
};

export default Collection;
