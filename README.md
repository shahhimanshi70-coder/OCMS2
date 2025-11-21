# OCMS2 - Online Canteen Management System

## 📋 Project Overview

OCMS2 is a full-stack web application for managing an online canteen system. It includes a React frontend for customer interactions and a Django REST API backend for server-side operations.

### Features
✅ Browse Menu Items  
✅ Place Orders  
✅ User Authentication & Registration  
✅ Contact Form  
✅ Admin Dashboard  
✅ RESTful API  
✅ Responsive Design  

---

## 📁 Project Structure

```
OCMS2/
├── canteen/                        # React Frontend
│   ├── src/
│   │   ├── App.jsx                # Main app component
│   │   ├── Components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Layouts/
│   │   │       ├── CanteenHome.jsx
│   │   │       ├── Menu.jsx
│   │   │       ├── Order.jsx
│   │   │       ├── Contact.jsx
│   │   │       └── Login.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/                        # Django Backend
│   ├── venv/                      # Python virtual environment
│   ├── core/                      # Django project settings
│   ├── menu/                      # Menu management app
│   ├── orders/                    # Order management app
│   ├── contact/                   # Contact form app
│   ├── users/                     # User authentication app
│   ├── manage.py                  # Django management command
│   ├── db.sqlite3                 # SQLite database
│   ├── requirements.txt           # Python dependencies
│   ├── run_backend.bat            # Run script (Windows)
│   ├── run_backend.ps1            # Run script (PowerShell)
│   └── BACKEND_DOCUMENTATION.md   # Backend docs
│
├── API_TESTING_GUIDE.md          # API testing instructions
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+ installed
- Node.js 18+ installed
- Git installed

### Quick Start

#### 1️⃣ Backend Setup (Django)

```bash
cd backend

# Create virtual environment (if not exists)
python -m venv venv

# Activate virtual environment
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1

# On Windows CMD:
venv\Scripts\activate.bat

# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (if needed)
python manage.py createsuperuser

# Run development server
python manage.py runserver 0.0.0.0:8000
```

**Or use the automated script:**
```bash
# Windows PowerShell
.\run_backend.ps1

# Windows CMD
run_backend.bat
```

#### 2️⃣ Frontend Setup (React)

```bash
cd canteen

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:5173

---

## 🔐 Default Credentials

### Admin Panel
- **URL**: http://localhost:8000/admin/
- **Username**: `admin`
- **Password**: `admin123`

---

## 📡 API Endpoints

### Base URL: `http://localhost:8000/api`

#### Menu Endpoints
- `GET /menu/items/` - Get all menu items
- `GET /menu/items/{id}/` - Get specific menu item
- `POST /menu/items/` - Create menu item (Admin only)
- `PUT /menu/items/{id}/` - Update menu item (Admin only)
- `DELETE /menu/items/{id}/` - Delete menu item (Admin only)

#### Order Endpoints
- `GET /orders/orders/` - Get user's orders (Auth required)
- `POST /orders/orders/` - Create new order (Auth required)
- `GET /orders/orders/{id}/` - Get order details (Auth required)
- `PUT /orders/orders/{id}/` - Update order (Auth required)

#### Contact Endpoints
- `GET /contact/messages/` - Get all messages
- `POST /contact/messages/` - Submit contact form

#### User Endpoints
- `POST /users/users/register/` - Register new user
- `GET /users/users/me/` - Get current user (Auth required)
- `GET /users/profiles/` - Get user profiles
- `POST /users/profiles/` - Create user profile

---

## 🗄️ Database Models

### MenuItem
```
- id (Primary Key)
- name (CharField)
- description (TextField)
- price (DecimalField)
- image (ImageField)
- created_at (DateTime)
- updated_at (DateTime)
```

### Order
```
- id (Primary Key)
- user (ForeignKey to User)
- items (ManyToMany to MenuItem)
- status (pending, confirmed, ready, delivered, cancelled)
- total_price (DecimalField)
- created_at (DateTime)
- updated_at (DateTime)
```

### ContactMessage
```
- id (Primary Key)
- name (CharField)
- email (EmailField)
- message (TextField)
- created_at (DateTime)
- updated_at (DateTime)
```

### UserProfile
```
- id (Primary Key)
- user (OneToOneField to User)
- phone (CharField)
- address (TextField)
- created_at (DateTime)
- updated_at (DateTime)
```

---

## 🔗 Frontend Features

### Pages
1. **Home** - Welcome page with image and "View Menu" button
2. **Menu** - Display all menu items with prices, navigation to Order page
3. **Order** - Place orders, view menu, contact support
4. **Contact** - Submit contact forms
5. **Login** - User authentication

### Components
- **Navbar** - Navigation menu
- **Layouts** - Page-specific layouts with responsive design
- **Styling** - Modern CSS with hover effects and animations

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0
- **React Router DOM** 7.9.6
- **Vite** 7.2.2
- **Bootstrap** 5.3.8
- **CSS3** with responsive design

### Backend
- **Django** 4.2.7
- **Django REST Framework** 3.14.0
- **SQLite** (default) / Ready for MongoDB
- **Pillow** 12.0.0 (image handling)
- **CORS Headers** 4.3.1

---

## 📝 Configuration Files

### Backend Settings
- `core/settings.py` - Django configuration
  - INSTALLED_APPS
  - MIDDLEWARE
  - DATABASES
  - CORS_ALLOWED_ORIGINS
  - REST_FRAMEWORK configuration

### Frontend Configuration
- `vite.config.js` - Vite build configuration
- `package.json` - Dependencies and scripts

---

## 🔄 Development Workflow

### Making Changes to Backend Models

```bash
# After modifying models.py in any app:
python manage.py makemigrations

# Apply migrations:
python manage.py migrate

# Create superuser if needed:
python manage.py createsuperuser
```

### Adding New Endpoints

1. Create model in `app/models.py`
2. Create serializer in `app/serializers.py`
3. Create viewset in `app/views.py`
4. Add routes in `app/urls.py`
5. Include app urls in `core/urls.py`

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
python manage.py runserver 8001
```

**Database errors:**
```bash
# Reset database
del db.sqlite3
python manage.py migrate
```

**CORS errors:**
Check `CORS_ALLOWED_ORIGINS` in `core/settings.py`

### Frontend Issues

**Dependencies not installing:**
```bash
npm install --legacy-peer-deps
```

**Port 5173 not available:**
```bash
npm run dev -- --port 3000
```

---

## 📊 Sample Data

The backend includes 4 sample menu items:
1. Pizza - $30.00
2. Burger - $35.00
3. Pasta - $40.00
4. Sandwich - $25.00

---

## 🔒 Security Notes

- Default admin password should be changed in production
- Enable HTTPS in production
- Set `DEBUG = False` in production
- Use environment variables for sensitive data
- Implement JWT authentication for better security

---

## 📚 Documentation

- [Backend Documentation](./backend/BACKEND_DOCUMENTATION.md)
- [API Testing Guide](./API_TESTING_GUIDE.md)
- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)

---

## 🚢 Deployment

### For Production:

1. **Backend**:
   - Use Gunicorn/uWSGI instead of development server
   - Use PostgreSQL instead of SQLite
   - Set `DEBUG = False`
   - Use environment variables
   - Enable HTTPS

2. **Frontend**:
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, or similar
   - Update API base URL to production server

---

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👨‍💻 Author

**Created**: November 21, 2025  
**Status**: ✅ Production Ready for Frontend Integration

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review API responses and error messages
3. Check Django admin panel for data verification
4. Review browser console for frontend errors

---

**Happy Coding! 🎉**
