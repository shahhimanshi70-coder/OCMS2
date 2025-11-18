import React from "react";
import "./HomePage.css"; // <-- optional external CSS file

export default function HomePage() {
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome to Our Canteen</h1>
      </header>

      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Menu</a>
        <a href="#">Offers</a>
        <a href="#">Contact</a>
      </nav>

      <div className="hero">
        Delicious Meals, Fresh Every Day
      </div>

      <section className="section">
        <h2>Today's Special</h2>

        <div className="menu-items">
          <div className="card">
            <h3>Chicken Biryani</h3>
            <p>Spicy and flavorful.</p>
            <strong>$5.00</strong>
          </div>

          <div className="card">
            <h3>Veg Thali</h3>
            <p>Healthy and fresh.</p>
            <strong>$4.00</strong>
          </div>

          <div className="card">
            <h3>Pasta</h3>
            <p>Creamy white sauce.</p>
            <strong>$4.50</strong>
          </div>
        </div>
      </section>
    </div>
  );
}
