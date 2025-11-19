import React from 'react';
import './CanteenHome.css';

const CanteenHome = () => {
  return (
    <div className="canteen-home">
      <h2>Welcome to the Canteen</h2>
      <p>Browse the menu and place your order with ease.</p>
      <div className="home-info">
        <h3>How it works:</h3>
        <ul>
          <li>Browse through our menu to see available food items.</li>
          <li>Place your order by clicking on the "Order Now" button.</li>
          <li>Enjoy delicious meals served fresh!</li>
        </ul>
      </div>
    </div>
  );
};

export default CanteenHome;
