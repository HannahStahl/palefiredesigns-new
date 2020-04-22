import React from 'react';

const Checkout = ({ items, bag, updateBag }) => {
  const removeItem = () => {
    // TODO
  };

  return (
    <div>
      <h1>SHOPPING BAG</h1>
      {items.length > 0 && (
        bag.length > 0 ? (
          bag.map((item) => (
            <div key={item} className="bag-item">
              <p className="bag-item-name">
                {items.find((itemInList) => itemInList.listing_id === item).title}
              </p>
            </div>
          ))
        ) : <p>Shopping bag is empty</p>
      )}
    </div>
  );
};

export default Checkout;
