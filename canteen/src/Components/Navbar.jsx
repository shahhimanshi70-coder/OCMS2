import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import img6 from '../assets/img/img6.jpg';


const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo-container">
        <img src={img6} alt="Canteen Logo" className="logo-img" />
        <h1 className="logo">Canteen Management System</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <Link to="/login">Login</Link>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
