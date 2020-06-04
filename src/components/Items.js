import React from 'react';
import ItemsList from './ItemsList';

const Items = ({
  items, sortBy, setSortBy, bag, updateBag,
}) => (
  <div className="page-content">
    <ItemsList
      items={items}
      sortBy={sortBy}
      setSortBy={setSortBy}
      bag={bag}
      updateBag={updateBag}
    />
  </div>
);

export default Items;
