# OCMS2 - Django Backend Documentation

## Project Setup Complete ✅

### Installation Summary
- **Python Virtual Environment**: Created and activated
- **Django Version**: 4.2.7
- **Database**: SQLite (ready for MongoDB integration)
- **REST Framework**: Django REST Framework 3.14.0
- **CORS**: Configured for frontend communication
- **Server Status**: Running on http://localhost:8000

---

## 📦 Backend Structure

```
backend/
├── venv/                          # Python virtual environment
├── manage.py                      # Django management script
├── requirements.txt               # Project dependencies
├── db.sqlite3                     # SQLite database
│
├── core/                          # Main Django project
│   ├── settings.py               # Project settings & configurations
│   ├── urls.py                   # Main URL routing
│   ├── asgi.py                   # ASGI configuration
│   └── wsgi.py                   # WSGI configuration
│
├── menu/                          # Menu items app
│   ├── models.py                 # MenuItem model
│   ├── serializers.py            # MenuItemSerializer
│   ├── views.py                  # MenuItemViewSet
│   ├── urls.py                   # Menu API routes
│   ├── admin.py                  # Admin configuration
│   ├── apps.py                   # App configuration
│   ├── migrations/               # Database migrations
│   └── tests.py                  # Tests
│
├── orders/                        # Orders app
│   ├── models.py                 # Order & OrderItem models
│   ├── serializers.py            # Order serializers
│   ├── views.py                  # Order ViewSets
│   ├── urls.py                   # Order API routes
│   ├── migrations/               # Database migrations
│   └── ...
│
├── contact/                       # Contact form app
│   ├── models.py                 # ContactMessage model
│   ├── serializers.py            # ContactMessageSerializer
│   ├── views.py                  # ContactMessageViewSet
│   ├── urls.py                   # Contact API routes
│   └── ...
│
└── users/                         # User authentication app
    ├── models.py                 # UserProfile model
    ├── serializers.py            # User serializers
    ├── views.py                  # User ViewSets (register, login)
    ├── urls.py                   # User API routes
    └── ...
```

---

## 🔗 API Endpoints

### Menu API
- `GET /api/menu/items/` - Get all menu items
- `GET /api/menu/items/<id>/` - Get specific menu item
- `POST /api/menu/items/` - Create menu item (Admin only)
- `PUT /api/menu/items/<id>/` - Update menu item (Admin only)
- `DELETE /api/menu/items/<id>/` - Delete menu item (Admin only)

### Orders API
- `GET /api/orders/orders/` - Get user's orders (Authenticated)
- `POST /api/orders/orders/` - Create new order (Authenticated)
- `GET /api/orders/orders/<id>/` - Get order details (Authenticated)
- `PUT /api/orders/orders/<id>/` - Update order (Authenticated)

### Contact API
- `GET /api/contact/messages/` - Get all contact messages
- `POST /api/contact/messages/` - Submit contact form

### Users API
- `POST /api/users/users/register/` - Register new user
- `GET /api/users/users/me/` - Get current user (Authenticated)
- `GET /api/users/profiles/` - Get user profiles
- `POST /api/users/profiles/` - Create user profile

### Authentication API
- `GET /api/auth/` - Get CSRF token and authentication options

---

## 📊 Database Models

### MenuItem
```python
- id: Integer (Primary Key)
- name: CharField(100)
- description: TextField
- price: DecimalField(10, 2)
- image: ImageField (upload_to='menu_items/')
- created_at: DateTimeField (auto_now_add=True)
- updated_at: DateTimeField (auto_now=True)
```

### Order
```python
- id: Integer (Primary Key)
- user: ForeignKey(User)
- items: ManyToManyField(MenuItem, through='OrderItem')
- status: CharField (pending, confirmed, ready, delivered, cancelled)
- total_price: DecimalField(10, 2)
- created_at: DateTimeField
- updated_at: DateTimeField
```

### OrderItem
```python
- id: Integer (Primary Key)
- order: ForeignKey(Order)
- menu_item: ForeignKey(MenuItem)
- quantity: PositiveIntegerField
- price: DecimalField(10, 2)
```

### ContactMessage
```python
- id: Integer (Primary Key)
- name: CharField
- email: EmailField
- message: TextField
- created_at: DateTimeField (auto_now_add=True)
- updated_at: DateTimeField (auto_now=True)
```

### UserProfile
```python
- id: Integer (Primary Key)
- user: OneToOneField(User)
- phone: CharField(20)
- address: TextField
- created_at: DateTimeField
- updated_at: DateTimeField
```

---

## 🔐 Admin Credentials

**Username**: `admin`  
**Password**: `admin123`  
**Admin URL**: http://localhost:8000/admin/

---

## 🚀 Running the Server

### Start the server:
```bash
cd backend
.\venv\Scripts\Activate.ps1  # Windows
python manage.py runserver 0.0.0.0:8000
```

### Make migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Create superuser:
```bash
python manage.py createsuperuser
```

### Run tests:
```bash
python manage.py test
```

---

## 📋 Dependencies

All dependencies are listed in `requirements.txt`:
- Django 4.2.7
- djangorestframework 3.14.0
- mongoengine 0.28.2
- pymongo 4.6.0
- django-cors-headers 4.3.1
- python-decouple 3.8
- python-dotenv 1.0.0
- Pillow 12.0.0+

---

## 🔄 Frontend Integration

The frontend is configured to communicate with the backend at:
- **Development**: http://localhost:8000
- **CORS Enabled for**: http://localhost:5173, http://localhost:3000

### Example API Call (React):
```javascript
// Fetch menu items
const response = await fetch('http://localhost:8000/api/menu/items/');
const data = await response.json();

// Submit contact form
const contactData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello from frontend'
};
const response = await fetch('http://localhost:8000/api/contact/messages/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contactData)
});
```

---

## ✨ Features Implemented

✅ Menu Management System  
✅ Order Management System  
✅ Contact Form Submission  
✅ User Authentication & Registration  
✅ CORS Configuration  
✅ Django Admin Interface  
✅ RESTful API with DRF  
✅ Database Models & Migrations  
✅ Image Upload Support  
✅ User Profiles  

---

## 🔮 Next Steps

1. Connect React frontend to all API endpoints
2. Add more validation to serializers
3. Implement JWT authentication for better security
4. Add MongoDB support with djongo (if needed)
5. Create comprehensive test cases
6. Deploy to production server

---

## 📞 Support

For issues or questions, check:
1. Django documentation: https://docs.djangoproject.com/
2. DRF documentation: https://www.django-rest-framework.org/
3. Admin panel: http://localhost:8000/admin/

---

**Backend Created**: November 21, 2025  
**Status**: ✅ Ready for Frontend Integration
