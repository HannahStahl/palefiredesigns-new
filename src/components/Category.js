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
  }, [match, items]);

  const getCategoryNickname = () => {
    if (categoryName === 'Necklaces') return 'Collar Me Beautiful';
    if (categoryName === 'Bracelets') return 'Wrist Action';
    if (categoryName === 'Earrings') return 'Lobe Trotters';
    return '';
  };

  return (
    <>
      <div className="category-banner">
        <div className="category-name">
          <h1>{getCategoryNickname().toUpperCase()}</h1>
        </div>
      </div>
      <Items
        items={filteredItems}
        bag={bag}
        updateBag={updateBag}
      />
    </>
  );
};

export default Category;
