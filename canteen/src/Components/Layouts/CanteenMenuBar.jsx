import React from "react";
import "./CanteenMenuBar.css";

export default function CanteenMenuBar() {
  const menuItems = [
    { name: "Chicken Biryani", price: "$5.00" },
    { name: "Veg Thali", price: "$4.00" },
    { name: "Pasta", price: "$4.50" },
    { name: "Sandwich", price: "$3.50" },
    { name: "Cold Drinks", price: "$1.50" }
  ];

  return (
    <div className="menu-bar">
      {menuItems.map((item, index) => (
        <div className="menu-item" key={index}>
          <span className="item-name">{item.name}</span>
          <span className="item-price">{item.price}</span>
        </div>
      ))}
    </div>
  );
}
