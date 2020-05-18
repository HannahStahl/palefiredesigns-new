import React from 'react';
import ItemsList from './ItemsList';

const Items = ({
  items, sortBy, setSortBy, bag, updateBag, closeOnRemove,
}) => (
  <div className="page-content">
    <ItemsList
      items={items}
      sortBy={sortBy}
      setSortBy={setSortBy}
      bag={bag}
      updateBag={updateBag}
      closeOnRemove={closeOnRemove}
    />
  </div>
);

export default Items;
