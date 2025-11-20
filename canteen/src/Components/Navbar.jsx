import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <h1 className="logo">Canteen Management System</h1>
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
