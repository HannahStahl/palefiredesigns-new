import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShoppingBagIcon from './ShoppingBagIcon';

export default ({ bag }) => (
  <Navbar collapseOnSelect expand="lg" fixed="top">
    <Navbar.Brand as={NavLink} to="/">HOME</Navbar.Brand>
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
          <NavDropdown.Item as={NavLink} to="/items/necklaces">NECKLACES</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/items/bracelets">BRACELETS</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/items/earrings">EARRINGS</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={NavLink} to="/about">ABOUT</Nav.Link>
        <Nav.Link as={NavLink} to="/contact">CONTACT</Nav.Link>
        <Nav.Link as={NavLink} to="/checkout"><ShoppingBagIcon bag={bag} /></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
