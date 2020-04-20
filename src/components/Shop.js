import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';

const Shop = ({ updateBag }) => {
  const [etsyItems, setEtsyItems] = useState([]);

  useEffect(() => {
    fetch('https://nbqclvrlaf.execute-api.us-east-1.amazonaws.com/dev/listings/get')
      .then((res) => res.json()).then((json) => { setEtsyItems(json.results); });
  }, []);

  const addToBag = (id) => {
    let bag = JSON.parse(localStorage.getItem('bag'));
    const newBagItem = { itemId: id, quantity: 1 };
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
      <h1>ALL ITEMS</h1>
      <div className="items">
        <Masonry className="masonry-layout" options={{ isFitWidth: true }}>
          {etsyItems.map((item) => (
            <div key={item.listing_id} className="item">
              <img
                src={item.Images[0].url_fullxfull}
                alt={item.title}
                className="item-img"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Shop;
