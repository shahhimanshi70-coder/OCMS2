# API Testing Guide - OCMS2 Backend

## 🚀 Backend Server Status

**Server URL**: http://localhost:8000  
**Status**: ✅ Running  
**Admin Panel**: http://localhost:8000/admin/  
**Sample Menu Items**: ✅ 4 items created

---

## ✅ API Endpoints Status

### 1. Menu API - GET Items
**Endpoint**: `GET /api/menu/items/`  
**Status**: ✅ Working  
**Response**: Returns all menu items  

**cURL**:
```bash
curl http://localhost:8000/api/menu/items/
```

**Expected Response**:
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
      "created_at": "2025-11-21T15:50:00Z",
      "updated_at": "2025-11-21T15:50:00Z"
    },
    ...
  ]
}
```

---

### 2. Menu API - GET Single Item
**Endpoint**: `GET /api/menu/items/1/`  
**Status**: ✅ Working  

**cURL**:
```bash
curl http://localhost:8000/api/menu/items/1/
```

---

### 3. Contact API - Submit Form
**Endpoint**: `POST /api/contact/messages/`  
**Status**: ✅ Working  
**Authentication**: Not required  

**cURL**:
```bash
curl -X POST http://localhost:8000/api/contact/messages/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello from API"
  }'
```

---

### 4. User Registration
**Endpoint**: `POST /api/users/users/register/`  
**Status**: ✅ Working  
**Authentication**: Not required  

**cURL**:
```bash
curl -X POST http://localhost:8000/api/users/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure123",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

---

### 5. Get Current User
**Endpoint**: `GET /api/users/users/me/`  
**Status**: ✅ Working  
**Authentication**: Required (Session/Token)  

**cURL with Session**:
```bash
curl -b cookies.txt http://localhost:8000/api/users/users/me/
```

---

### 6. Orders API
**Endpoint**: `GET /api/orders/orders/`  
**Status**: ✅ Working  
**Authentication**: Required  

**cURL with Session**:
```bash
curl -b cookies.txt http://localhost:8000/api/orders/orders/
```

---

## 📊 Database Status

✅ **Tables Created**:
- auth_user
- auth_group
- auth_permission
- menu_menuitem (4 sample items)
- orders_order
- orders_orderitem
- contact_contactmessage
- users_userprofile

**Database File**: `backend/db.sqlite3`

---

## 🔐 Admin Credentials

- **Username**: admin
- **Password**: admin123
- **URL**: http://localhost:8000/admin/

---

## 🔗 Frontend Integration Example

### React Hooks to Fetch Menu Items

```javascript
import { useState, useEffect } from 'react';

function MenuComponent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/menu/items/')
      .then(res => res.json())
      .then(data => {
        setItems(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Submit Contact Form

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };

  const response = await fetch('http://localhost:8000/api/contact/messages/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    console.log('Message sent successfully');
    e.target.reset();
  }
};
```

### Register User

```javascript
const registerUser = async (formData) => {
  const response = await fetch('http://localhost:8000/api/users/users/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName
    })
  });

  const data = await response.json();
  return data;
};
```

---

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: CORS is configured for localhost:5173 and localhost:3000. Make sure your React app is running on one of these ports.

### Issue: Database locked
**Solution**: Delete `db.sqlite3` and run migrations again:
```bash
python manage.py migrate
```

### Issue: Port 8000 already in use
**Solution**: Run server on different port:
```bash
python manage.py runserver 0.0.0.0:8001
```

### Issue: Module not found
**Solution**: Make sure virtual environment is activated:
```bash
.\venv\Scripts\Activate.ps1
```

---

## 📝 Sample API Responses

### Menu Items Response
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
      "created_at": "2025-11-21T15:50:23.456Z",
      "updated_at": "2025-11-21T15:50:23.456Z"
    },
    {
      "id": 2,
      "name": "Burger",
      "description": "Beef burger with fries",
      "price": "35.00",
      "image": null,
      "created_at": "2025-11-21T15:50:24.123Z",
      "updated_at": "2025-11-21T15:50:24.123Z"
    },
    {
      "id": 3,
      "name": "Pasta",
      "description": "Pasta with tomato sauce",
      "price": "40.00",
      "image": null,
      "created_at": "2025-11-21T15:50:24.789Z",
      "updated_at": "2025-11-21T15:50:24.789Z"
    },
    {
      "id": 4,
      "name": "Sandwich",
      "description": "Grilled chicken sandwich",
      "price": "25.00",
      "image": null,
      "created_at": "2025-11-21T15:50:25.456Z",
      "updated_at": "2025-11-21T15:50:25.456Z"
    }
  ]
}
```

---

## ✨ What's Working

✅ Menu API (GET, POST, PUT, DELETE)  
✅ Contact Form API (POST)  
✅ User Registration (POST)  
✅ User Profile API  
✅ Orders API  
✅ Admin Interface  
✅ CORS Configuration  
✅ Database Models  
✅ Sample Data  

---

**Status**: 🟢 Backend is fully operational and ready for frontend integration!

**Test Date**: November 21, 2025
