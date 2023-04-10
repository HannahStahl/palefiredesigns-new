import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default ({
  show,
  selected,
  colorSelected,
  setColorSelected,
  bag,
  item,
  exitQuickview,
  updateBag,
  setFadeOut,
}) => {
  const multipleColors = item && item.colors && item.colors.length > 0;

  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (!item) setButtonText('');
    else {
      const index = bag.findIndex((itemInBag) => (
        itemInBag.listingId === item._id
        && itemInBag.color === colorSelected
      ));
      setButtonText(index > -1 ? 'REMOVE FROM BAG' : 'ADD TO BAG');
    }
  }, [bag, item, colorSelected]);

  const addOrRemoveFromBag = () => {
    const newBagItem = { listingId: item._id, color: colorSelected };
    const index = bag.findIndex((itemInBag) => (
      itemInBag.listingId === newBagItem.listingId
      && itemInBag.color === newBagItem.color
    ));
    let addingItem = true;
    if (index > -1) {
      addingItem = false;
      bag.splice(index, 1);
      setButtonText('ADD TO BAG');
    } else {
      bag.push(newBagItem);
      setButtonText('ADDED TO BAG!');
    }
    const closeQuickview = addingItem || window.location.pathname === '/checkout';
    if (closeQuickview) {
      setFadeOut(true);
      setTimeout(() => {
        exitQuickview();
        updateBag(bag);
      }, 500);
    } else updateBag(bag);
  };

  return (
    <div className={`item-details-container ${show ? 'visible' : 'hidden'}`}>
      <div className="item-details" id="quickview-details">
        {selected === undefined ? <></> : (
          <>
            <div className={`item-price-container${multipleColors ? '' : ' without-colors'}`}>
              <h3 className="item-price">{`$${item.price.toFixed(2)}`}</h3>
              {multipleColors && (
                <FormControl
                  as="select"
                  value={colorSelected}
                  onChange={(e) => setColorSelected(e.target.value)}
                  className="color-dropdown"
                >
                  <option value="" disabled>SELECT COLOR</option>
                  {item.colors.map((color) => <option key={color} value={color}>{color}</option>)}
                </FormControl>
              )}
              <Button
                size="lg"
                variant="outline-dark"
                onClick={addOrRemoveFromBag}
                disabled={multipleColors && colorSelected === ''}
                className="aqua-button"
              >
                {buttonText}
              </Button>
            </div>
            {(item.length || item.width) && (
              <div className="item-dimensions">
                <img src="/dimensions.svg" alt="Dimensions" className="item-details-icon" />
                <p>
                  {item.length ? `${item.length}" long` : ''}
                  {(item.length && item.width) ? ', ' : ''}
                  {item.width ? `${item.width}" wide` : ''}
                </p>
              </div>
            )}
            {(item.materials && item.materials.length > 0) && (
              <div className="item-materials">
                <img src="/materials.svg" alt="Materials" className="item-details-icon" />
                <p>{item.materials.map((material, index) => `${index > 0 ? ', ' : ''}${material}`)}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
