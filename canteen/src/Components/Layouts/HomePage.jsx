import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Optional custom styles

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">

      {/* Banner Section */}
      <div className="banner text-center text-white d-flex align-items-center justify-content-center">
        <h1 className="fw-bold">Welcome to Canteen Management System</h1>
      </div>

      {/* Main Buttons */}
      <div className="container text-center mt-5">
        <h2 className="fw-semibold mb-4">What would you like to do?</h2>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-primary px-4 py-2" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="btn btn-success px-4 py-2" onClick={() => navigate("/order")}>
            Order Food
          </button>

          <button className="btn btn-warning px-4 py-2" onClick={() => navigate("/billing")}>
            Billing
          </button>
        </div>
      </div>

      {/* Feature Section */}
      <div className="container mt-5">
        <h3 className="text-center mb-4 fw-bold">Canteen Highlights</h3>

        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3">
              <img src="/images/fast-food.jpg" className="img-fluid rounded" alt="Food" />
              <h5 className="mt-3">Fresh & Tasty Food</h5>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3">
              <img src="/images/snacks.jpg" className="img-fluid rounded" alt="Snacks" />
              <h5 className="mt-3">Snacks & Beverages</h5>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm p-3">
              <img src="/images/service.jpg" className="img-fluid rounded" alt="Service" />
              <h5 className="mt-3">Quick Service</h5>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 p-3 bg-dark text-white">
        <p className="mb-0">&copy; {new Date().getFullYear()} Canteen Management System</p>
      </footer>

    </div>
  );
}

export default HomePage;
