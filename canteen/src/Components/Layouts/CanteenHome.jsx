import React from 'react';
import { Link } from 'react-router-dom';
import './CanteenHome.css';
import img7 from '../../assets/img/img7.jpg';
const CanteenHome = () => {
  return (
    <div className="canteen-home">
      <div className="home-container">
        <div className="home-left">
          <img src={img7} alt="Canteen" className="side-img" />
        </div>
        <div className="home-right">
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
          <Link to="/menu" className="menu-button">View Menu</Link>
        </div>
      </div>
    </div>
  );
};

export default CanteenHome;
