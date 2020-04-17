import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import config from '../config';

const Item = ({ match, items, updateBag }) => {
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    const itemName = unescape(match.params.itemName).replace(/_/g, ' ');
    const itemDetails = items.find((itemInList) => (
      itemInList.itemName.toLowerCase() === itemName.toLowerCase()
    ));
    setItem(itemDetails);
  }, [match.params.itemName, items]);

  const addToBag = () => {
    let bag = JSON.parse(localStorage.getItem('bag'));
    const newBagItem = { itemId: item.itemId, quantity: 1 };
    if (bag) {
      const index = bag.findIndex((itemInList) => itemInList.itemId === newBagItem.itemId);
      const currentBagItem = bag[index];
      if (currentBagItem) {
        const newQuantity = currentBagItem.quantity + parseInt(newBagItem.quantity);
        bag[index].quantity = newQuantity;
      } else {
        bag.push(newBagItem);
      }
    } else {
      bag = [newBagItem];
    }
    localStorage.setItem('bag', JSON.stringify(bag));
    updateBag();
  };

  return (
    <div>
      {item && (
        <>
          <h1>{item.itemName}</h1>
          <p>{item.itemDescription}</p>
          <div className="items">
            {item.itemPhotos.map((photo) => (
              <div className="item" key={photo.photoName}>
                <img
                  className="item-img"
                  src={`${config.cloudfrontURL}/${photo.photoName}`}
                  alt={item.itemName}
                />
              </div>
            ))}
          </div>
          <Button size="lg" variant="outline-dark" onClick={addToBag}>
            Add to Bag
          </Button>
        </>
      )}
    </div>
  );
};

export default Item;
