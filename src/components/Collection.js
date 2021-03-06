import React, { useState, useEffect } from 'react';
import ItemsList from './ItemsList';
import config from '../config';

const Collection = ({
  items, sortBy, setSortBy, bag, updateBag, match,
}) => {
  const [collectionName, setCollectionName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (match) {
      const thisCollectionName = match.params.collectionName.toLowerCase().replace(/-/g, ' ');
      if (!['luxe cuffs'].includes(thisCollectionName)) {
        window.location.pathname = '/items';
      } else {
        setCollectionName(thisCollectionName);
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
      <div
        className="category-banner"
        style={{
          backgroundImage: collectionName.length > 0 ? (
            `url("${config.publicCloudfrontURL}/dalefeuerjewelry-${collectionName.replace(/ /g, '-').toLowerCase()}-banner.jpg")`
          ) : undefined,
        }}
      />
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
