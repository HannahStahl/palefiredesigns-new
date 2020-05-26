import React, { useState, useEffect } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Button from 'react-bootstrap/Button';
import config from '../config';
import CheckoutForm from './CheckoutForm';
import CheckoutSuccess from './CheckoutSuccess';
import ItemsList from './ItemsList';
import { constructOrderNotificationHtml, constructOrderConfirmationHtml, getItemDetails } from '../utils';


const Checkout = ({ items, bag, updateBag }) => {
  const [stripe, setStripe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [checkoutFormVisible, setCheckoutFormVisible] = useState(false);
  const [enableStripeDisplay, setEnableStripeDisplay] = useState(false);

  useEffect(() => {
    setStripe(window.Stripe(config.stripeKey));
    setTimeout(() => setEnableStripeDisplay(true), 1000);
  }, []);

  useEffect(() => {
    if (items.length > 0 && bag.length > 0) {
      let runningTotal = 0;
      let index = 0;
      let itemNotFound = false;
      while (index < bag.length && !itemNotFound) {
        const item = bag[index];
        const itemDetails = getItemDetails(items, item);
        if (itemDetails) {
          runningTotal += parseFloat(getItemDetails(items, item).price);
          index += 1;
        } else {
          itemNotFound = true;
          bag.splice(index, 1);
          updateBag(bag);
        }
      }
      if (!itemNotFound) setTotal(runningTotal);
    }
  }, [items, bag]);

  const showCheckoutForm = () => {
    setCheckoutFormVisible(true);
    const { offsetTop } = document.getElementById('checkout');
    setTimeout(() => {
      window.scrollTo({ top: offsetTop - 40, behavior: 'smooth' });
      document.getElementById('name').focus();
    }, 100);
  };

  const handleSubmit = async ({
    token, error, name, email, address, city, state, zip,
  }) => {
    if (error) {
      alert(error);
      return;
    }
    setIsLoading(true);
    try {
      fetch(`${config.etsyApiURL}/purchase`, {
        method: 'POST',
        body: JSON.stringify({
          listingIds: bag,
          amount: total,
          description: config.businessName,
          source: token.id,
          userId: config.userID,
          email,
        }),
      }).then((res) => res.json()).then((json) => {
        if (!json.status) {
          alert('Oops! An error occurred with our checkout form. Please use the Contact page to send me a message, and we\'ll get everything straightened out.');
          setIsLoading(false);
        } else {
          const emailsToSend = [
            fetch(config.emailURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                html: constructOrderNotificationHtml(
                  bag.map((item) => getItemDetails(items, item)),
                  name, total, address, city, state, zip,
                ),
                userEmail: email,
                clientEmail: config.emailAddress,
                siteDomain: window.location.origin,
                orderNotification: true,
              }),
            }),
            fetch(config.emailURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                html: constructOrderConfirmationHtml(
                  bag.map((item) => getItemDetails(items, item)),
                  name, total, address, city, state, zip,
                ),
                userEmail: email,
                clientEmail: config.emailAddress,
                siteDomain: window.location.origin,
                orderConfirmation: true,
                businessName: config.businessName,
              }),
            }),
          ];
          Promise.all(emailsToSend).then(() => {
            updateBag([]);
            setIsLoading(false);
            setShowSuccessModal(true);
          });
        }
      });
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="page-content">
      <h1 className="checkout-header">SHOPPING BAG</h1>
      {items.length > 0 && (
        (bag.length > 0 && total > 0) ? (
          <div className="checkout-container">
            <div className={`shopping-bag-details${checkoutFormVisible ? ' collapsed' : ''}`}>
              <ItemsList
                items={bag.map((item) => getItemDetails(items, item))}
                bag={bag}
                updateBag={updateBag}
                closeOnRemove
              />
              <h4 className="bag-total">
                <span>TOTAL:</span>
                <span>{`$${total.toFixed(2)}`}</span>
              </h4>
              <div className="shipping-note">
                <p>Free standard shipping with USPS.</p>
                <p>Please allow 1-2 days of processing time prior to shipping.</p>
              </div>
              <Button
                size="lg"
                variant="outline-dark"
                onClick={showCheckoutForm}
                className={`aqua-button checkout-button${checkoutFormVisible ? ' hidden' : ''}`}
              >
                CHECK OUT
              </Button>
            </div>
            <div id="checkout" className={`checkout-form-container ${checkoutFormVisible ? 'visible' : 'hidden'}`}>
              {enableStripeDisplay && (
                <StripeProvider stripe={stripe}>
                  <Elements
                    fonts={[{
                      cssSrc: 'https://fonts.googleapis.com/css2?family=Dosis:wght@200;300;400;500;600;700;800&display=swap',
                    }]}
                  >
                    <CheckoutForm isLoading={isLoading} onSubmit={handleSubmit} />
                  </Elements>
                </StripeProvider>
              )}
            </div>
          </div>
        ) : <p>No items yet</p>
      )}
      <CheckoutSuccess show={showSuccessModal} closeModal={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Checkout;
