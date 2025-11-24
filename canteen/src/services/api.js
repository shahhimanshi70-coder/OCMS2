// API Service for OCMS2 Frontend
// Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
};

// ==================== MENU API ====================
export const menuAPI = {
  // Get all menu items
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/items/`);
      const data = await handleResponse(response);
      return data.results || [];
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  },

  // Get single menu item
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/items/${id}/`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching menu item ${id}:`, error);
      return null;
    }
  },

  // Create menu item (Admin only) - supports FormData for image upload
  create: async (data) => {
    try {
      const isFormData = data instanceof FormData;
      const response = await fetch(`${API_BASE_URL}/menu/items/`, {
        method: 'POST',
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: isFormData ? data : JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating menu item:', error);
      return null;
    }
  },

  // Create menu item with image (Admin only)
  createWithImage: async (name, description, price, image) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }
      const response = await fetch(`${API_BASE_URL}/menu/items/`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating menu item with image:', error);
      return null;
    }
  },

  // Update menu item (Admin only) - supports FormData for image upload
  update: async (id, data) => {
    try {
      const isFormData = data instanceof FormData;
      const response = await fetch(`${API_BASE_URL}/menu/items/${id}/`, {
        method: 'PUT',
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: isFormData ? data : JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating menu item ${id}:`, error);
      return null;
    }
  },

  // Delete menu item (Admin only)
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/items/${id}/`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) return true;
      return false;
    } catch (error) {
      console.error(`Error deleting menu item ${id}:`, error);
      return false;
    }
  }
};

// ==================== CONTACT API ====================
export const contactAPI = {
  // Get all contact messages (Admin only)
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/messages/`, {
        credentials: 'include'
      });
      const data = await handleResponse(response);
      return data.results || [];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  },

  // Submit contact form
  submit: async (name, email, message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return null;
    }
  }
};

// ==================== USER API ====================
export const userAPI = {
  // Register new user
  register: async (username, email, password, firstName = '', lastName = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName
        })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/users/me/`, {
        credentials: 'include'
      });
      if (response.ok) {
        return await handleResponse(response);
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  // Get all user profiles (Admin only)
  getProfiles: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profiles/`, {
        credentials: 'include'
      });
      const data = await handleResponse(response);
      return data.results || [];
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      return [];
    }
  },

  // Create user profile
  createProfile: async (phone = '', address = '') => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profiles/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, address })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
  }
};

// ==================== ORDER API ====================
export const orderAPI = {
  // Get user's orders
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/orders/`, {
        credentials: 'include'
      });
      const data = await handleResponse(response);
      return data.results || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  // Get single order
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/orders/${id}/`, {
        credentials: 'include'
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error);
      return null;
    }
  },

  // Create new order
  create: async (items, totalPrice, status = 'pending') => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items,
          total_price: totalPrice,
          status
        })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  },

  // Update order
  update: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/orders/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error updating order ${id}:`, error);
      return null;
    }
  }
};

// ==================== AUTHENTICATION ====================
export const auth = {
  // Login user (using session authentication)
  login: async (username, password) => {
    try {
      // Django session-based auth - adjust based on your implementation
      const response = await fetch(`${API_BASE_URL}/auth/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  },

  // Logout user
  logout: async () => {
    try {
      // Clear session/cookies on frontend
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const user = await userAPI.getCurrentUser();
    return user !== null;
  }
};

export default {
  menuAPI,
  contactAPI,
  userAPI,
  orderAPI,
  auth,
  API_BASE_URL
};
