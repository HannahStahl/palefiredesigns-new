import React, { useState, useEffect } from 'react';
import Items from './Items';

const Category = ({
  items, bag, updateBag, match,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
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
  }, [match]);

  return <Items items={filteredItems} bag={bag} updateBag={updateBag} header={categoryName.toUpperCase()} />;
};

export default Category;
