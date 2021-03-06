import React from 'react';
import { useSelector } from 'react-redux';

import { selectDirectorySections } from '../../redux/directory/directory.selector';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

const Directory = () => {
  const sections = useSelector(selectDirectorySections);

  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherProps }) => (
        <MenuItem key={id} {...otherProps} />
      ))}
    </div>
  );
};

export default Directory;
