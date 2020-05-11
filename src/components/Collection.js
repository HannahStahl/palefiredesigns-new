import React, { useState, useEffect } from 'react';
import Items from './Items';

const Collection = ({
  items, bag, updateBag, match,
}) => {
  const [collectionName, setCollectionName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const thisCollectionName = match.params.collectionName.toLowerCase().replace(/-/g, ' ');
    if (!['luxe cuffs'].includes(thisCollectionName)) {
      window.location.pathname = '/items';
    } else {
      setCollectionName(thisCollectionName);
      setFilteredItems(items.filter((item) => (
        item.tags.map((tag) => tag.toLowerCase()).includes(thisCollectionName)
      )));
    }
  }, [match, items]);

  return (
    <>
      <div className="category-banner">
        <div className="category-name">
          <h1>{collectionName.toUpperCase()}</h1>
        </div>
      </div>
      <Items items={filteredItems} bag={bag} updateBag={updateBag} />
    </>
  );
};

export default Collection;
