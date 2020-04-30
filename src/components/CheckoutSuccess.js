import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CheckoutSuccess = ({ show, closeModal }) => (
  <Modal show={show} onHide={closeModal} className="checkout-success" centered>
    <Modal.Header closeButton />
    <Modal.Body>
      <p>Thanks for your order!</p>
      <Button size="lg" variant="outline-dark">BACK TO SHOP</Button>
    </Modal.Body>
  </Modal>
);

export default CheckoutSuccess;
