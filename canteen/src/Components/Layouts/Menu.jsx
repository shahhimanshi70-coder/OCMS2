import React, { useState, useEffect } from 'react';
import './Menu.css';
import img2 from '../../assets/img/img2.jpg';
import img3 from '../../assets/img/img3.jpg';
import img4 from '../../assets/img/img4.jpg';
import img5 from '../../assets/img/img5.jpg';

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);

  // Simulating fetching food items
  useEffect(() => {
    setTimeout(() => {
      setFoodItems([
        { id: 1, name: 'Pizza', description: 'Cheese and pepperoni pizza', price: '30.00', img: img5 },
        { id: 2, name: 'Burger', description: 'Beef burger with fries', price: '35', img: img2 },
        { id: 3, name: 'Pasta', description: 'Pasta with tomato sauce', price: '40', img: img3 },
        { id: 4, name: 'Sandwich', description: 'Grilled chicken sandwich', price: '250', img: img4 },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="menu-page">
      <h2>Our Menu</h2>
      {foodItems.length > 0 ? (
        <ul className="food-list">
          {foodItems.map(item => (
            <li key={item.id} className="food-item">
              {item.img && <img src={item.img} alt={item.name} className="food-img" />}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Price: ${item.price}</strong></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading menu...</p>
      )}
    </div>
  );
};

export default Menu;
