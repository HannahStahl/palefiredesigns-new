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
            as={NavLink}
            to="/items"
            isActive={() => window.location.pathname === '/items'}
          >
            ALL
          </NavDropdown.Item>
          <NavDropdown.Item className="navbar-dropdown-header">BY CATEGORY</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/items/necklaces" className="navbar-dropdown-category">Necklaces</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/items/bracelets" className="navbar-dropdown-category">Bracelets</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/items/earrings" className="navbar-dropdown-category">Earrings</NavDropdown.Item>
          <NavDropdown.Item className="navbar-dropdown-header">BY COLLECTION</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/collections/luxe-cuffs" className="navbar-dropdown-category">Luxe Cuffs</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={NavLink} to="/about">ABOUT</Nav.Link>
        <Nav.Link as={NavLink} to="/contact">CONTACT</Nav.Link>
        <Nav.Link as={NavLink} to="/checkout"><ShoppingBagIcon bag={bag} /></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
