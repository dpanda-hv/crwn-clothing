import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, routeName, isPreview }) => {
  const match = useRouteMatch();

  return (
    <div className="collection-preview">
      <h1 className="title">
        {isPreview ? (
          <Link to={`${match.url}/${routeName}`}>{title.toUpperCase()}</Link>
        ) : (
          title.toUpperCase()
        )}
      </h1>
      <div className="preview">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
