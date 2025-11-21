# 🔗 Frontend to Backend Integration Guide

## Quick Integration Steps

### 1. Create API Service File

Create `canteen/src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api';

// Menu API
export const getMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/items/`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const getMenuItemById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/items/${id}/`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu item:', error);
    return null;
  }
};

// Contact API
export const submitContact = async (name, email, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message })
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact:', error);
    return null;
  }
};

// User API
export const registerUser = async (username, email, password, firstName, lastName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/users/me/`, {
      credentials: 'include'
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

// Orders API
export const createOrder = async (items, totalPrice) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        items,
        total_price: totalPrice,
        status: 'pending'
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const getUserOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/orders/`, {
      credentials: 'include'
    });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
```

---

### 2. Update Menu Component

Modify `canteen/src/Components/Layouts/Menu.jsx`:

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { getMenuItems } from '../../services/api';

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setFoodItems(items);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="menu-page">
      <h2>Our Menu</h2>
      {foodItems.length > 0 ? (
        <ul className="food-list">
          {foodItems.map(item => (
            <li key={item.id} className="food-item">
              <div className="food-item-left">
                {item.image && <img src={item.image} alt={item.name} className="food-img" />}
              </div>
              <div className="food-item-middle">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="food-item-right">
                <p className="price"><strong>${item.price}</strong></p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}

      <Link to="/order" className="order-btn">
        Go to Order Page
      </Link>
    </div>
  );
};

export default Menu;
```

---

### 3. Update Contact Component

Modify `canteen/src/Components/Layouts/Contact.jsx`:

```javascript
import React, { useState } from 'react';
import './Contact.css';
import { submitContact } from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    try {
      const result = await submitContact(formData.name, formData.email, formData.message);
      if (result) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to contact us!</p>
      
      {success && <p className="success-message">Message sent successfully!</p>}
      
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </label>
        <textarea 
          name="message"
          placeholder="Your message..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
```

---

### 4. Update Login Component

Modify `canteen/src/Components/Layouts/Login.jsx`:

```javascript
import React, { useState } from "react";
import "./Login.css";
import { registerUser } from "../../services/api";

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

    if (isLogin) {
      // For login, you might use Django's session authentication
      setMessage("Login functionality coming soon!");
    } else {
      // Register
      try {
        const result = await registerUser(
          formData.username,
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );
        if (result && result.message) {
          setMessage("Registration successful! Please login.");
          setFormData({ email: "", username: "", password: "", firstName: "", lastName: "" });
          setTimeout(() => setIsLogin(true), 2000);
        }
      } catch (error) {
        setMessage("Error during registration");
        console.error(error);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">{isLogin ? "Login" : "Register"}</h2>

        {message && <p className="message">{message}</p>}

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
```

---

### 5. API Response Examples

**GET /api/menu/items/**
```json
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Pizza",
      "description": "Cheese and pepperoni pizza",
      "price": "30.00",
      "image": null,
      "created_at": "2025-11-21T15:50:23Z",
      "updated_at": "2025-11-21T15:50:23Z"
    },
    ...
  ]
}
```

**POST /api/contact/messages/**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great service!",
  "created_at": "2025-11-21T16:00:00Z",
  "updated_at": "2025-11-21T16:00:00Z"
}
```

---

## Testing the Integration

1. **Start Backend**
   ```bash
   cd backend
   .\venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
   ```

2. **Start Frontend**
   ```bash
   cd canteen
   npm run dev
   ```

3. **Test Menu Page**
   - Navigate to http://localhost:5173/menu
   - Should display 4 menu items from backend

4. **Test Contact Form**
   - Go to contact page
   - Submit form
   - Check admin panel for submission

5. **Test Registration**
   - Go to login page
   - Register new user
   - Check admin panel for new user

---

## Common Issues & Solutions

### CORS Error
**Problem**: "No 'Access-Control-Allow-Origin' header"  
**Solution**: Backend CORS is configured. Make sure frontend is on localhost:5173

### 404 on Menu Items
**Problem**: API returns empty results  
**Solution**: Backend might not have data. Run: 
```bash
python manage.py shell -c "from menu.models import MenuItem; MenuItem.objects.create(name='Test', description='Test item', price=10.00)"
```

### Session Not Working
**Problem**: Can't create orders without login  
**Solution**: Frontend needs to handle authentication with credentials:
```javascript
fetch(url, { credentials: 'include' })
```

---

## Next Advanced Features

1. **Cart Management** - Store items before checkout
2. **Order History** - Show user's past orders
3. **Payment Integration** - Add payment gateway
4. **Real-time Updates** - WebSocket for order status
5. **Search & Filter** - Find items quickly
6. **Reviews & Ratings** - Customer feedback

---

**Integration Complete!** Your frontend is now connected to the backend API. 🎉
