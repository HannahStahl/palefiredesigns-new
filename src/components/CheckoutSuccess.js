import React from 'react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CheckoutSuccess = ({ show, closeModal }) => (
  <Modal show={show} onHide={closeModal} className="checkout-success" centered>
    <Modal.Header closeButton />
    <Modal.Body>
      <p>Thanks for your order!</p>
      <NavLink to="/items">
        <Button size="lg" variant="outline-dark" className="coral-button">BACK TO SHOP</Button>
      </NavLink>
    </Modal.Body>
  </Modal>
);

export default CheckoutSuccess;
