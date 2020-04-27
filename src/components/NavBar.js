import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShoppingBagIcon from './ShoppingBagIcon';

const NavBar = ({ bag }) => (
  <Navbar collapseOnSelect expand="lg" fixed="top">
    <Navbar.Brand href="/">HOME</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" activeKey={window.location.pathname}>
        <NavDropdown title="SHOP" className={window.location.pathname.includes('items') ? 'active' : ''}>
          <NavDropdown.Item href="/items">ALL</NavDropdown.Item>
          <NavDropdown.Item href="/items/necklaces">NECKLACES</NavDropdown.Item>
          <NavDropdown.Item href="/items/bracelets">BRACELETS</NavDropdown.Item>
          <NavDropdown.Item href="/items/earrings">EARRINGS</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/about">ABOUT</Nav.Link>
        <Nav.Link href="/contact">CONTACT</Nav.Link>
        <Nav.Link href="/checkout"><ShoppingBagIcon bag={bag} /></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
