import React, { useState, useEffect } from 'react';
import './AdminUpload.css';
import { menuAPI } from '../../services/api';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [uploadedItems, setUploadedItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch uploaded items on component mount
  useEffect(() => {
    fetchUploadedItems();
  }, []);

  const fetchUploadedItems = async () => {
    setItemsLoading(true);
    try {
      const items = await menuAPI.getAll();
      console.log('✓ Fetched items:', items);
      items.forEach(item => {
        console.log(`Item: ${item.name}, Image URL:`, item.image);
      });
      setUploadedItems(items || []);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setUploadedItems([]);
    } finally {
      setItemsLoading(false);
    }
  };

  const handleDeleteItem = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setDeleting(id);
    try {
      const success = await menuAPI.delete(id);
      if (success) {
        setMessage(`✓ "${name}" deleted successfully!`);
        setMessageType('success');
        fetchUploadedItems(); // Refresh the list
        window.dispatchEvent(new Event('menuUpdated')); // Refresh menu on website
      } else {
        setMessage('Failed to delete item. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage(`Error: ${error.message}`);
      setMessageType('error');
    } finally {
      setDeleting(null);
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setMessage('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
        setMessageType('error');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size exceeds 5MB limit.');
        setMessageType('error');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Image preview loaded:', reader.result.substring(0, 50) + '...');
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        console.error('Failed to read file');
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.image) {
      setMessage('Please fill in all fields and select an image.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append('name', formData.name);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('price', parseFloat(formData.price));
      uploadFormData.append('image', formData.image);

      // Call the API
      const result = await menuAPI.createWithImage(uploadFormData);

      if (result && result.id) {
        setMessage(`✓ Menu item "${formData.name}" uploaded successfully!`);
        setMessageType('success');
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          image: null
        });
        setImagePreview('');
        document.querySelector('input[type="file"]').value = '';

        // Trigger menu refresh
        window.dispatchEvent(new Event('menuUpdated'));
      } else {
        setMessage('Failed to upload menu item. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Error: ${error.message || 'Failed to upload menu item.'}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>Add Menu Item</h2>
      
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="name">Item Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Butter Chicken"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the menu item..."
            rows="4"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., 9.99"
            step="0.01"
            min="0"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            disabled={loading}
          />
          {imagePreview && (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <p className="preview-label">✓ {formData.image.name}</p>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="upload-btn">
          {loading ? 'Uploading...' : 'Upload Menu Item'}
        </button>
      </form>

      {/* Uploaded Items List */}
      <div className="uploaded-items-section">
        <h3>Uploaded Menu Items</h3>
        
        {itemsLoading ? (
          <p className="loading-text">Loading items...</p>
        ) : uploadedItems.length > 0 ? (
          <div className="items-grid">
            {uploadedItems.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-image-wrapper">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="item-image"
                      onLoad={() => console.log(`✓ Image loaded: ${item.name}`)}
                      onError={(e) => {
                        console.error(`✗ Image failed to load: ${item.name}`, item.image);
                        e.currentTarget.src = '/assets/default-food.png';
                      }}
                    />
                  ) : (
                    <div className="no-image-placeholder">No Image</div>
                  )}
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">${item.price}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteItem(item.id, item.name)}
                  disabled={deleting === item.id}
                >
                  {deleting === item.id ? '🗑️ Deleting...' : '🗑️ Delete'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-items-text">No menu items uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminUpload;
