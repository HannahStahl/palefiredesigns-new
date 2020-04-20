import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ShoppingBagIcon from './ShoppingBagIcon';

const NavBar = ({ bag }) => (
  <Navbar collapseOnSelect expand="lg">
    <Navbar.Brand href="/">
      <img
        alt="Home"
        src="/favicon.ico"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto" activeKey={window.location.pathname}>
        <Nav.Link href="/items">SHOP</Nav.Link>
        <Nav.Link href="/about">ABOUT</Nav.Link>
        <Nav.Link href="/contact">CONTACT</Nav.Link>
        <Nav.Link href="/checkout"><ShoppingBagIcon bag={bag} /></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
