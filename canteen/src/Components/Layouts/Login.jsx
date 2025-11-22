import React, { useState } from "react";
import "./Login.css";
import { userAPI } from "../../services/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isLogin) {
      setMessage("ℹ️ Login functionality requires additional setup");
    } else {
      try {
        const result = await userAPI.register(
          formData.username,
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );
        
        if (result && result.message) {
          setMessage("✅ Registration successful! Please login.");
          setFormData({ email: "", username: "", password: "", firstName: "", lastName: "" });
          setTimeout(() => {
            setIsLogin(true);
            setMessage("");
          }, 2000);
        } else {
          setMessage("❌ Registration failed");
        }
      } catch (error) {
        setMessage("❌ Error during registration");
        console.error(error);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">{isLogin ? "Login" : "Register"}</h2>

        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                className="login-input"
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="login-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="login-input"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setFormData({
                email: "",
                username: "",
                password: "",
                firstName: "",
                lastName: ""
              });
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
