import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShoppingBagIcon from './ShoppingBagIcon';

export default ({ bag }) => (
  <Navbar collapseOnSelect expand="lg" fixed="top">
    <Navbar.Brand as={NavLink} to="/">
      <img src="/dale-feuer-logo.png" alt="Home" className="navbar-home-link" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" activeKey={window.location.pathname}>
        <NavDropdown title="SHOP" className={window.location.pathname.includes('items') ? 'active' : ''}>
          <NavDropdown.Item
            eventKey="1"
            as={NavLink}
            to="/items"
            isActive={() => window.location.pathname === '/items'}
          >
            ALL
          </NavDropdown.Item>
          <div className="navbar-dropdown-header">BY CATEGORY</div>
          <NavDropdown.Item
            eventKey="2"
            as={NavLink}
            to="/items/necklaces"
            className="navbar-dropdown-category"
          >
            Necklaces
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="3"
            as={NavLink}
            to="/items/bracelets"
            className="navbar-dropdown-category"
          >
            Bracelets
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="4"
            as={NavLink}
            to="/items/earrings"
            className="navbar-dropdown-category"
          >
            Earrings
          </NavDropdown.Item>
          <div className="navbar-dropdown-header">BY COLLECTION</div>
          <NavDropdown.Item
            eventKey="5"
            as={NavLink}
            to="/collections/luxe-cuffs"
            className="navbar-dropdown-category"
          >
            Luxe Cuffs
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link eventKey="6" as={NavLink} to="/about">ABOUT</Nav.Link>
        <Nav.Link eventKey="7" as={NavLink} to="/contact">CONTACT</Nav.Link>
        <Nav.Link eventKey="8" as={NavLink} to="/checkout"><ShoppingBagIcon bag={bag} /></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
