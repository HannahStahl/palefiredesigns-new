import React, { useState, useEffect } from 'react';
import ItemsList from './ItemsList';

const Category = ({
  items, sortBy, setSortBy, bag, updateBag, match,
}) => {
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
        setFilteredItems(items.filter((item) => (
          item.taxonomy_path && item.taxonomy_path[1] === capitalizedCategoryName
        )));
      }
    }
  }, [match, items]);

  return (
    <div className="page-content">
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
