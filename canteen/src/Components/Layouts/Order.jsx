import React from 'react';
import './Order.css';

const Order = () => {
  return (
    <div className="order-page">
      <h2>Place Your Order</h2>
      <p>Select your items from the menu to order!</p>
      <button className="order-button">Proceed to Order</button>
    </div>
  );
};

export default Order;
