import React, { useState } from 'react';
import { menuAPI } from '../../services/api';
import './AdminUpload.css';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.price) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (!formData.image) {
        setError('Please select an image');
        setLoading(false);
        return;
      }

      const result = await menuAPI.createWithImage(
        formData.name,
        formData.description,
        parseFloat(formData.price),
        formData.image
      );

      if (result) {
        setMessage('✓ Menu item uploaded successfully!');
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          image: null
        });
        setPreview(null);
        
        // Trigger menu refresh
        window.dispatchEvent(new Event('menuUpdated'));
      } else {
        setError('Failed to upload menu item. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>Add Menu Item</h2>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="name">Item Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Biryani"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the item..."
            rows="4"
            required
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
            placeholder="e.g., 12.99"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          <small>Accepted formats: JPG, PNG, GIF (Max 5MB)</small>
        </div>

        {preview && (
          <div className="preview-container">
            <h4>Image Preview:</h4>
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button
          type="submit"
          className="upload-btn"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Item'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
