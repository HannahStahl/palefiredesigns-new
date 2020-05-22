import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Home from './Home';
import About from './About';
import Items from './Items';
import Category from './Category';
import Collection from './Collection';
import Contact from './Contact';
import Checkout from './Checkout';

export default ({
  items, sortBy, setSortBy, bag, updateBag,
}) => {
  const routes = [
    { path: '/', Component: Home },
    { path: '/about', Component: About },
    {
      path: '/items',
      Component: Items,
      props: {
        items, sortBy, setSortBy, bag, updateBag,
      },
    },
    {
      path: '/items/:categoryName',
      Component: Category,
      props: {
        items, sortBy, setSortBy, bag, updateBag,
      },
    },
    {
      path: '/collections/:collectionName',
      Component: Collection,
      props: {
        items, sortBy, setSortBy, bag, updateBag,
      },
    },
    { path: '/contact', Component: Contact },
    { path: '/checkout', Component: Checkout, props: { items, bag, updateBag } },
  ];

  return (
    <>
      {routes.map(({ path, Component, props }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match !== null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <div className={`page ${window.location.pathname.split('/')[1]}-page`}>
                <Component {...props} match={match} />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </>
  );
};
