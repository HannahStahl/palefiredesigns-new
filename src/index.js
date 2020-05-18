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

const App = withRouter(() => {
  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState(sortByOptions[0]);
  const [sortedItems, setSortedItems] = useState([]);
  const [bag, setBag] = useState([]);

  const updateBag = (newBag) => {
    if (newBag) localStorage.setItem('bag', JSON.stringify(newBag));
    const bagStr = localStorage.getItem('bag');
    setBag(bagStr ? JSON.parse(bagStr) : []);
  };

  useEffect(() => {
    fetch(`${config.etsyApiURL}/listings`).then((res) => res.json()).then((json) => {
      const newItems = json.results;
      newItems.forEach((item, index) => {
        if (!item.Images) newItems[index].Images = [{ url_fullxfull: 'placeholder.png' }];
      });
      setItems(newItems);
      setSortedItems(newItems);
    });
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

  return (
    <>
      <NavBar bag={bag} />
      <Routes
        items={sortedItems}
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
