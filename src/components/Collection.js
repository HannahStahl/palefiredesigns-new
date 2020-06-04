import React, { useState, useEffect } from 'react';
import ItemsList from './ItemsList';

const Collection = ({
  items, sortBy, setSortBy, bag, updateBag, match,
}) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (match) {
      const thisCollectionName = match.params.collectionName.toLowerCase().replace(/-/g, ' ');
      if (!['luxe cuffs'].includes(thisCollectionName)) {
        window.location.pathname = '/items';
      } else {
        const itemType = thisCollectionName.slice(0, -1);
        setFilteredItems(items.filter((item) => (
          item.title.toLowerCase().includes(itemType)
          || item.description.toLowerCase().includes(itemType)
          || item.tags.map((tag) => tag.toLowerCase()).includes(itemType)
        )));
      }
    }
  }, [match, items]);

  return (
    <div className="page-content">
      <ItemsList
        items={filteredItems}
        sortBy={sortBy}
        setSortBy={setSortBy}
        bag={bag}
        updateBag={updateBag}
      />
    </div>
  );
};

export default Collection;
