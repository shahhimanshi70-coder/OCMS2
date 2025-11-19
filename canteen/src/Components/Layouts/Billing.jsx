import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Billing() {
  const [cart, setCart] = useState([
    { name: "Tea", price: 10, qty: 2 },
    { name: "Burger", price: 50, qty: 1 },
  ]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(5);

  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const discountAmt = (subtotal * discount) / 100;
  const taxAmt = (subtotal * tax) / 100;
  const grandTotal = subtotal - discountAmt + taxAmt;

  const printBill = () => {
    window.print();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Billing / Receipt</h2>

        {/* Cart Table */}
        <table className="table table-bordered text-center">
          <thead className="table-primary">
            <tr>
              <th>Item Name</th>
              <th>Price (₹)</th>
              <th>Qty</th>
              <th>Total (₹)</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.qty}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Price Summary */}
        <div className="mt-4">
          <p><strong>Subtotal: </strong> ₹{subtotal}</p>

          <label><strong>Discount (%):</strong></label>
          <input
            type="number"
            className="form-control mb-2"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />

          <label><strong>Tax (%):</strong></label>
          <input
            type="number"
            className="form-control mb-2"
            value={tax}
            onChange={(e) => setTax(Number(e.target.value))}
          />

          <hr />
          <h4>
            Grand Total: <span className="text-success">₹{grandTotal}</span>
          </h4>
        </div>

        {/* Print Button */}
        <button className="btn btn-success w-100 mt-3" onClick={printBill}>
          Print Bill
        </button>
      </div>
    </div>
  );
}

export default Billing;
