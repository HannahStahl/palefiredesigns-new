import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Masonry from 'react-masonry-component';

const Shop = ({ items, bag, updateBag }) => {
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

  const addOrRemoveFromBag = () => {
    const { listing_id } = items[selected]; // eslint-disable-line camelcase
    const newBagItem = listing_id; // eslint-disable-line camelcase
    const index = bag.findIndex((itemInList) => itemInList === newBagItem);
    if (index > -1) bag.splice(index, 1);
    else bag.push(newBagItem);
    updateBag(bag);
  };

  console.log(items[selected]);

  const getButtonText = () => {
    const item = items[selected];
    if (!item) return '';
    const index = bag.findIndex((itemInList) => itemInList === item.listing_id);
    return index > -1 ? 'Remove from Bag' : 'Add to Bag';
  };

  return (
    <div>
      <style>
        {`@keyframes showQuickview {
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
        }`}
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
              {selected === undefined ? <></> : (
                <>
                  <h3>{items[selected].title}</h3>
                  <div className="item-price-container">
                    <h4>{`$${items[selected].price}`}</h4>
                    <Button size="lg" variant="outline-dark" onClick={addOrRemoveFromBag}>
                      {getButtonText()}
                    </Button>
                  </div>
                  <p>{unescape(items[selected].description.replace(/&#39;/g, "'"))}</p>
                </>
              )}
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
