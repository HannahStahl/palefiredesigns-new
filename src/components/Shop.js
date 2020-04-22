import React, { useState } from 'react';
import Masonry from 'react-masonry-component';

const Shop = ({ items, updateBag }) => {
  const [selected, setSelected] = useState(undefined);
  const [imgTop, setImgTop] = useState(undefined);
  const [imgLeft, setImgLeft] = useState(undefined);

  const quickView = (index) => {
    setSelected(index);
    const img = document.getElementById(`item-${index}`);
    const {
      top, left, width, height,
    } = img.getBoundingClientRect();
    const quickviewImg = document.getElementById('quickview-img');
    quickviewImg.style.width = `${width}px`;
    quickviewImg.style.height = `${height}px`;
    const quickview = document.getElementById('quickview');
    setImgTop(top);
    setImgLeft(left);
    quickview.classList.add('visible');
    const detailsContainer = document.getElementById('quickview-details-container');
    const details = document.getElementById('quickview-details');
    detailsContainer.classList.add('visible');
    details.classList.add('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.add('visible');
  };

  const exitQuickview = () => {
    setSelected(undefined);
    const quickview = document.getElementById('quickview');
    quickview.classList.remove('visible');
    const detailsContainer = document.getElementById('quickview-details-container');
    const details = document.getElementById('quickview-details');
    detailsContainer.classList.remove('visible');
    details.classList.remove('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.remove('visible');
  };

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
      <style>
        {
          `
            @keyframes showQuickview {
              from {
                top: ${imgTop}px;
                left: ${imgLeft}px;
                margin: 0;
                border-right: none;
                border-bottom: none;
              }
              to {
                top: 0;
                left: 0;
                margin: 10vh 10vw 10vh 10vw;
                border-right: solid 1px black;
                border-bottom: solid 1px black;
              }
            }
          `
        }
      </style>
      <h1>ALL ITEMS</h1>
      <div className="items">
        <div className="background-overlay" id="background-overlay" />
        <div className="quickview" id="quickview">
          <img
            src={selected === undefined ? undefined : items[selected].Images[0].url_fullxfull}
            alt={selected === undefined ? '' : items[selected].title}
            className="quickview-img"
            id="quickview-img"
          />
          <div className="item-details-container" id="quickview-details-container">
            <div className="item-details" id="quickview-details">
              <h3>
                {selected === undefined ? '' : items[selected].title}
              </h3>
              <p>
                {selected === undefined ? '' : unescape(items[selected].description.replace(/&#39;/g, "'"))}
              </p>
            </div>
          </div>
          <div className="exit-quickview" onClick={exitQuickview}>x</div>
        </div>
        <Masonry className="masonry-layout" options={{ isFitWidth: true }}>
          {items.map((item, index) => (
            <div key={item.listing_id} className="item">
              <img
                src={item.Images[0].url_fullxfull}
                alt={item.title}
                className="item-img"
                id={`item-${index}`}
                onClick={() => quickView(index)}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Shop;
