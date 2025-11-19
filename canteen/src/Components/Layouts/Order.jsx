import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Order() {
  const navigate = useNavigate();

  // Sample menu items
  const menuItems = [
    { id: 1, name: "Tea", price: 10 },
    { id: 2, name: "Coffee", price: 15 },
    { id: 3, name: "Burger", price: 50 },
    { id: 4, name: "Sandwich", price: 40 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((i) => i.id !== itemId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Order Page</h2>

      <div className="row">
        {/* Menu Items */}
        <div className="col-md-6">
          <h4>Menu</h4>
          <div className="list-group">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.name} - ₹{item.price}
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="col-md-6">
          <h4>Cart</h4>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.qty}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <h5>Total: ₹{total}</h5>
          <button
            className="btn btn-success mt-2"
            onClick={() => navigate("/billing")}
            disabled={cart.length === 0}
          >
            Proceed to Billing
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
