import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, withRouter, Route, Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import About from './components/About';
import Items from './components/Items';
import Category from './components/Category';
import Contact from './components/Contact';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import config from './config';

const Routes = ({ items, bag, updateBag }) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/items" exact render={() => <Items items={items} bag={bag} updateBag={updateBag} />} />
    <Route
      path="/items/:categoryName"
      exact
      render={(props) => (
        <Category items={items} bag={bag} updateBag={updateBag} match={props.match} />
      )}
    />
    <Route path="/contact" exact component={Contact} />
    <Route path="/checkout" exact render={() => <Checkout items={items} bag={bag} updateBag={updateBag} />} />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(() => {
  const [items, setItems] = useState([]);
  const [bag, setBag] = useState([]);

  const updateBag = (newBag) => {
    if (newBag) localStorage.setItem('bag', JSON.stringify(newBag));
    const bagStr = localStorage.getItem('bag');
    setBag(bagStr ? JSON.parse(bagStr) : []);
  };

  useEffect(() => {
    fetch(`${config.etsyApiURL}/listings`).then((res) => res.json()).then((json) => {
      setItems(json.results);
    });

    updateBag();
  }, []);

  return (
    <>
      <NavBar bag={bag} />
      <div className={window.location.pathname === '/' ? '' : 'page-content'}>
        <Routes items={items} bag={bag} updateBag={updateBag} />
      </div>
      <Footer />
    </>
  );
});

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
