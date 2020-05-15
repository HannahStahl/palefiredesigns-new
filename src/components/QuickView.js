import React, { useState, useEffect } from 'react';
import QuickViewCarousel from './QuickViewCarousel';
import QuickViewThumbnails from './QuickViewThumbnails';
import QuickViewDetails from './QuickViewDetails';

const QuickView = ({
  items, selected, setSelected, bag, updateBag, closeOnRemove,
}) => {
  const item = items[selected];
  const [imgIndex, setImgIndex] = useState(0);
  const [imgTop, setImgTop] = useState(undefined);
  const [imgLeft, setImgLeft] = useState(undefined);
  const [imgHeight, setImgHeight] = useState(undefined);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [layoutComplete, setLayoutComplete] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const showThumbnails = layoutComplete && imagesLoaded;

  useEffect(() => {
    if (selected !== undefined) {
      const img = document.getElementById(`item-${selected}`);
      img.style.visibility = 'hidden';
      const { top, left, height } = img.getBoundingClientRect();
      setImgTop(top);
      setImgLeft(left);
      setImgHeight(height);
      const quickview = document.getElementById('quickview');
      quickview.classList.add('expanded');
      const quickviewImgContainer = document.getElementById('quickview-img-container');
      quickviewImgContainer.classList.add('expanded');
      const details = document.getElementById('quickview-details');
      details.classList.add('visible');
      const overlay = document.getElementById('background-overlay');
      overlay.classList.add('visible');
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setAnimationComplete(true);
      }, 1200);
    }
  }, [selected]);

  const exitQuickview = () => {
    const img = document.getElementById(`item-${selected}`);
    setSelected(undefined);
    img.style.visibility = 'visible';
    const quickview = document.getElementById('quickview');
    quickview.classList.remove('expanded');
    const quickviewImgContainer = document.getElementById('quickview-img-container');
    quickviewImgContainer.classList.remove('expanded');
    const details = document.getElementById('quickview-details');
    details.classList.remove('visible');
    const overlay = document.getElementById('background-overlay');
    overlay.classList.remove('visible');
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
    setImgIndex(0);
    setAnimationComplete(false);
    setImagesLoaded(false);
    setLayoutComplete(false);
  };

  let mobileStyling = false;
  let quickviewWidth = 897;
  const availableWidth = 0.9 * window.innerWidth;
  if (availableWidth < 897) {
    mobileStyling = true;
    quickviewWidth = 332;
  }
  const quickviewMargin = (window.innerWidth - quickviewWidth) / 2;
  let style = `
    @keyframes expandQuickview {
      0% {
        top: ${imgTop}px;
        left: ${imgLeft}px;
        margin: 0;
        max-height: ${imgHeight}px;
        width: 302px;
      }
      33.3% {
        top: 0;
        left: 0;
        margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
        max-height: ${imgHeight + 30}px;
        width: 332px;
      }
      66.7% {
        top: 0;
        left: 0;
        margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
        max-height: ${imgHeight + 30}px;
        width: ${quickviewWidth}px;
      }
      100% {
        top: 0;
        left: 0;
        margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
        max-height: 80vh;
        width: ${quickviewWidth}px;
      }
    }
    .quickview {
      top: ${imgTop}px;
      left: ${imgLeft}px;
      max-height: ${imgHeight}px;
    }
    .quickview.expanded {
      width: ${quickviewWidth}px;
      margin: 10vh ${quickviewMargin}px 10vh ${quickviewMargin}px;
    }
  `;
  if (mobileStyling) {
    style += `
      .item-details-container {
        margin-left: 11px;
        margin-right: 11px;
      }
      .thumbnails-container {
        width: 300px;
      }
      .thumbnail, .thumbnail-img {
        width: 80px;
      }
    `;
  }

  return (
    <div className="background-overlay" id="background-overlay">
      <style>{style}</style>
      <div className="quickview" id="quickview">
        <div className="quickview-img-container" id="quickview-img-container">
          {selected === undefined ? <></> : (
            <QuickViewCarousel
              imgIndex={imgIndex}
              setImgIndex={setImgIndex}
              item={item}
              selected={selected}
              mobileStyling={mobileStyling}
            />
          )}
        </div>
        {animationComplete ? (
          <QuickViewThumbnails
            showThumbnails={showThumbnails}
            selected={selected}
            setLayoutComplete={setLayoutComplete}
            setImagesLoaded={setImagesLoaded}
            item={item}
            setImgIndex={setImgIndex}
          />
        ) : (
          <div className="thumbnails-placeholder" />
        )}
        <QuickViewDetails
          selected={selected}
          bag={bag}
          item={item}
          closeOnRemove={closeOnRemove}
          exitQuickview={exitQuickview}
          updateBag={updateBag}
        />
      </div>
      <div className="exit-quickview" onClick={exitQuickview}>
        <img src="/exit.svg" alt="Exit" />
      </div>
    </div>
  );
};

export default QuickView;
