import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Masonry from 'react-masonry-component';

const Shop = ({ items, bag, updateBag }) => {
  const [selected, setSelected] = useState(undefined);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgTop, setImgTop] = useState(undefined);
  const [imgLeft, setImgLeft] = useState(undefined);
  const [imgHeight, setImgHeight] = useState(undefined);

  const quickView = (index) => {
    setImgIndex(0);
    setSelected(index);
    const img = document.getElementById(`item-${index}`);
    img.style.visibility = 'hidden';
    const { top, left, height } = img.getBoundingClientRect();
    const quickview = document.getElementById('quickview');
    setImgTop(top);
    setImgLeft(left);
    setImgHeight(height);
    quickview.classList.add('visible');
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.classList.add('visible');
    const detailsContainer = document.getElementById('quickview-details-container');
    const details = document.getElementById('quickview-details');
    detailsContainer.classList.add('visible');
    details.classList.add('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.add('visible');
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  };

  const exitQuickview = () => {
    const img = document.getElementById(`item-${selected}`);
    setSelected(undefined);
    img.style.visibility = 'visible';
    const quickview = document.getElementById('quickview');
    quickview.classList.remove('visible');
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.classList.remove('visible');
    const detailsContainer = document.getElementById('quickview-details-container');
    const details = document.getElementById('quickview-details');
    detailsContainer.classList.remove('visible');
    details.classList.remove('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.remove('visible');
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
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
            max-height: ${imgHeight}px;
          }
          to {
            top: 0;
            left: 0;
            margin: 10vh 10vw 10vh 10vw;
            border-right: solid 1px black;
            border-bottom: solid 1px black;
            max-height: 80vh;
          }
        }`}
      </style>
      <h1>ALL ITEMS</h1>
      <div className="items">
        <div className="background-overlay" id="background-overlay" />
        <div className="quickview" id="quickview">
          <div className="quickview-images-container">
            {selected === undefined ? <></> : (
              <Carousel activeIndex={imgIndex} onSelect={setImgIndex} interval={false}>
                {items[selected].Images.map((image) => (
                  <Carousel.Item key={image.listing_image_id}>
                    <img
                      src={selected === undefined ? undefined : image.url_fullxfull}
                      alt={selected === undefined ? '' : items[selected].title}
                      className="quickview-img"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <Masonry className="masonry-layout thumbnails" id="thumbnails" options={{ isFitWidth: true }}>
              {selected === undefined ? <></> : items[selected].Images.map((image, index) => (
                <div key={image.listing_image_id} className="thumbnail">
                  <img
                    src={image.url_fullxfull}
                    alt={items[selected].title}
                    className="thumbnail-img"
                    id={`thumbnail-${index}`}
                    onClick={() => setImgIndex(index)}
                  />
                </div>
              ))}
            </Masonry>
          </div>
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
