import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview.component';
import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-preview">
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} isPreview {...otherProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
