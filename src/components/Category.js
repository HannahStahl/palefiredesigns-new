import React, { useState, useEffect } from 'react';
import Items from './Items';

const Category = ({
  items, bag, updateBag, match,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const getEtsyCategoryName = (name) => {
    if (name === 'NECKLACES') return 'Necklace';
    if (name === 'BRACELETS') return 'Bracelet';
    if (name === 'EARRINGS') return 'Earrings';
    return undefined;
  };

  useEffect(() => {
    const uppercaseCategoryName = match.params.categoryName.toUpperCase();
    const etsyCategoryName = getEtsyCategoryName(uppercaseCategoryName);
    if (!etsyCategoryName) window.location.pathname = '/items';
    else {
      setCategoryName(uppercaseCategoryName);
      setFilteredItems(items.filter((item) => (
        item.category_path && item.category_path[1] === etsyCategoryName
      )));
    }
  }, [match]);

  return <Items items={filteredItems} bag={bag} updateBag={updateBag} header={categoryName} />;
};

export default Category;
