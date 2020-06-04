import React, { useState, useEffect } from 'react';
import ItemsList from './ItemsList';
import config from '../config';

const Category = ({
  items, sortBy, setSortBy, bag, updateBag, match,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (match) {
      const thisCategoryName = match.params.categoryName;
      const capitalizedCategoryName = (
        thisCategoryName.charAt(0).toUpperCase() + thisCategoryName.slice(1)
      );
      if (!['Necklaces', 'Bracelets', 'Earrings'].includes(capitalizedCategoryName)) {
        window.location.pathname = '/items';
      } else {
        setCategoryName(capitalizedCategoryName);
        setFilteredItems(items.filter((item) => (
          item.taxonomy_path && item.taxonomy_path[1] === capitalizedCategoryName
        )));
      }
    }
  }, [match, items]);

  return (
    <div className="page-content">
      <div
        className="category-banner"
        style={{
          backgroundImage: categoryName.length > 0 ? (
            `url("${config.publicCloudfrontURL}/dalefeuerjewelry-${categoryName.toLowerCase()}-banner.jpg")`
          ) : undefined,
        }}
      />
      <ItemsList
        items={filteredItems}
        bag={bag}
        updateBag={updateBag}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
};

export default Category;
