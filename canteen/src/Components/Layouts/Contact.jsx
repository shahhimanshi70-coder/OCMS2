import React, { useState } from 'react';
import './Contact.css';
import { contactAPI } from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    setMessage('');

    try {
      const result = await contactAPI.submit(
        formData.name,
        formData.email,
        formData.message
      );
      
      if (result) {
        setMessage('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      setMessage('❌ Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to contact us!</p>
      
      {message && <p className="status-message">{message}</p>}
      
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
