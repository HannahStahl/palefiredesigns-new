import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

const Checkout = ({ items, bag, updateBag }) => {
  const updateQuantity = (newQuantity, index) => {
    if ((/^(\s*|\d+)$/).test(newQuantity)) {
      const updatedBag = bag;
      updatedBag[index].quantity = parseInt(newQuantity);
      localStorage.setItem('bag', JSON.stringify(updatedBag));
      updateBag();
    }
  };

  return (
    <div>
      <h1>SHOPPING BAG</h1>
      {items.length > 0 && (
        bag.length > 0 ? (
          bag.map((item, index) => (
            <div key={item.itemId} className="bag-item">
              <p className="bag-item-name">
                {items.find((itemInList) => itemInList.itemId === item.itemId).itemName}
              </p>
              <FormControl
                type="text"
                value={item.quantity}
                onChange={(e) => updateQuantity(e.target.value, index)}
                className="bag-item-quantity"
              />
            </div>
          ))
        ) : <p>Shopping bag is empty</p>
      )}
    </div>
  );
};

export default Checkout;
