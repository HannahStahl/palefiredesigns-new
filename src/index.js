import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Routes from './components/Routes';
import config from './config';
import { sortByOptions } from './utils';

const App = withRouter((props) => {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [sortedItems, setSortedItems] = useState([]);
  const [bag, setBag] = useState([]);

  const updateBag = (newBag) => {
    if (newBag) localStorage.setItem('cart', JSON.stringify(newBag));
    const bagStr = localStorage.getItem('cart');
    setBag(bagStr ? JSON.parse(bagStr) : []);
  };

  const refreshItems = () => (
    fetch(config.sanityURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            allListing(sort: { _createdAt: DESC }) {
              _id
              title
              category
              collection
              price
              length
              width
              materials
              colors
              photos {
                asset {
                  url
                }
              }
            }
          }
        `,
      }),
    }).then((res) => res.json()).then(({ data: { allListing } }) => {
      setItems(allListing);
      setSortedItems(allListing);
    })
  );

  useEffect(() => {
    refreshItems();
    updateBag();
  }, []);

  useEffect(() => {
    if (sortBy === 'Newest') {
      setSortedItems([...items]);
    } else if (sortBy === 'Least expensive') {
      setSortedItems([...items].sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
    } else if (sortBy === 'Most expensive') {
      setSortedItems([...items].sort((a, b) => parseFloat(b.price) - parseFloat(a.price)));
    }
  }, [sortBy, items]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [props.location]);

  return (
    <>
      <NavBar bag={bag} />
      <Routes
        items={sortedItems}
        refreshItems={refreshItems}
        sortBy={sortBy}
        setSortBy={setSortBy}
        bag={bag}
        updateBag={updateBag}
      />
      <Footer />
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
