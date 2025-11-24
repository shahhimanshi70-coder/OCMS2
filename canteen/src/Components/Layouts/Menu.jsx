import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { menuAPI } from '../../services/api';

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show "Menu already opened!" message on component mount
    setShowMessage(true);
    const timer = setTimeout(() => setShowMessage(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchMenuItems = useCallback(async () => {
    setLoading(true);
    try {
      const items = await menuAPI.getAll();
      setFoodItems(items || []);
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
      setFoodItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Listen for uploads - refetch when new items are added
  useEffect(() => {
    const onMenuUpdated = () => {
      console.log('Menu updated event received, refetching...');
      fetchMenuItems();
    };
    window.addEventListener('menuUpdated', onMenuUpdated);
    return () => window.removeEventListener('menuUpdated', onMenuUpdated);
  }, [fetchMenuItems]);

  return (
    <div className="menu-page">

      <h2>Our Menu</h2>
      {showMessage && <p className="menu-opened-msg">📖 Menu already opened!</p>}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, justifyContent: 'center' }}>
        <button className="refresh-btn" onClick={fetchMenuItems} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Menu'}
        </button>
        <Link to="/admin/upload" className="upload-link">
          + Add Item
        </Link>
      </div>

      {loading ? (
        <p>Loading menu...</p>
      ) : foodItems.length > 0 ? (
        <ul className="food-list">
          {foodItems.map(item => (
            <li key={item.id} className="food-item">
              <div className="food-item-left">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="food-img"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/default-food.png';
                    }}
                  />
                ) : (
                  <img src="/assets/default-food.png" alt="default" className="food-img" />
                )}
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
