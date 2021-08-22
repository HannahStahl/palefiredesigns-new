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
  variations,
}) => {
  let colors = [];
  if (variations) {
    colors = variations
      .map((variation) => variation.property_values[0])
      .filter((variation) => variation && variation.property_name === 'Primary color')
      .map((color) => color.values[0]);
  }
  const multipleColors = colors.length > 0;
  let selectedProductId;
  if (colorSelected) {
    const variationSelected = variations.find((variationInList) => {
      const variation = variationInList.property_values[0];
      if (!variation) return false;
      const isColor = variation.property_name === 'Primary color';
      if (!isColor) return false;
      return variation.values[0] === colorSelected;
    });
    selectedProductId = variationSelected.product_id;
  }

  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (!item) setButtonText('');
    else {
      const index = bag.findIndex((itemInBag) => (
        itemInBag.listingId === item.listing_id
        && itemInBag.productId === selectedProductId
      ));
      setButtonText(index > -1 ? 'REMOVE FROM BAG' : 'ADD TO BAG');
    }
  }, [bag, item, colorSelected, selectedProductId]);

  const addOrRemoveFromBag = () => {
    const productId = selectedProductId;
    const newBagItem = { listingId: item.listing_id, productId };
    const index = bag.findIndex((itemInBag) => (
      itemInBag.listingId === newBagItem.listingId
      && itemInBag.productId === newBagItem.productId
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

  const getUnits = () => {
    if (selected === undefined) return undefined;
    const unit = item.item_dimensions_unit;
    if (unit === 'in') return '"';
    if (unit === 'ft') return "'";
    return unit;
  };

  const units = getUnits();

  return (
    <div className={`item-details-container ${show ? 'visible' : 'hidden'}`}>
      <div className="item-details" id="quickview-details">
        {selected === undefined ? <></> : (
          <>
            <div className={`item-price-container${multipleColors ? '' : ' without-colors'}`}>
              <h3 className="item-price">{`$${item.price}`}</h3>
              {multipleColors && (
                <FormControl
                  as="select"
                  value={colorSelected}
                  onChange={(e) => setColorSelected(e.target.value)}
                  className="color-dropdown"
                >
                  <option value="" disabled>SELECT COLOR</option>
                  {colors.map((color) => <option key={color} value={color}>{color}</option>)}
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
            {(item.item_length || item.item_width) && (
              <div className="item-dimensions">
                <img src="/dimensions.svg" alt="Dimensions" className="item-details-icon" />
                <p>
                  {item.item_length ? `${item.item_length}${units} long` : ''}
                  {(item.item_length && item.item_width) ? ', ' : ''}
                  {item.item_width ? `${item.item_width}${units} wide` : ''}
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
