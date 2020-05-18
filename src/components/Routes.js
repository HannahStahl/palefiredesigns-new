import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Items from './Items';
import Category from './Category';
import Collection from './Collection';
import Contact from './Contact';
import Checkout from './Checkout';
import NotFound from './NotFound';

export default ({
  items, sortBy, setSortBy, bag, updateBag,
}) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route
      path="/items"
      exact
      render={() => (
        <Items
          items={items}
          sortBy={sortBy}
          setSortBy={setSortBy}
          bag={bag}
          updateBag={updateBag}
        />
      )}
    />
    <Route
      path="/items/:categoryName"
      exact
      render={(props) => (
        <Category
          items={items}
          sortBy={sortBy}
          setSortBy={setSortBy}
          bag={bag}
          updateBag={updateBag}
          match={props.match}
        />
      )}
    />
    <Route
      path="/collections/:collectionName"
      exact
      render={(props) => (
        <Collection
          items={items}
          sortBy={sortBy}
          setSortBy={setSortBy}
          bag={bag}
          updateBag={updateBag}
          match={props.match}
        />
      )}
    />
    <Route path="/contact" exact component={Contact} />
    <Route path="/checkout" exact render={() => <Checkout items={items} bag={bag} updateBag={updateBag} />} />
    <Route component={NotFound} />
  </Switch>
);
