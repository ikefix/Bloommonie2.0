import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { useShopStore } from '../../../stores/shopStore';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';
import Box from '../../components/Box';
// import InventoryStatus from '../../components/InventoryStatus';

import overflowImage from '../../assets/logo.png';

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { shops, currentShop, fetchShops, isLoading } = useShopStore();
  const navigate = useNavigate();
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/login');
    }
  };

  // Fetch shops on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchShops().then((result) => {
        if (result.success && result.data.shops.length === 0) {
          setIsFirstTime(true);
        }
      });
    }
  }, [isAuthenticated, user, fetchShops]);

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Loading...</h1>
        <p>Please wait while we load your dashboard...</p>
      </div>
    );
  }

  // Show loading while fetching shops
  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Loading...</h1>
        <p>Please wait while we load your stores...</p>
      </div>
    );
  }

  // If no stores found, show create store prompt
  if (shops.length === 0) {
    return (
      <>
      <div style={{ 
        backgroundImage: `url(${overflowImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
       }}></div>
      <div style={{ margin: '200px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ 
          fontFamily: 'monospace',
          fontSize: '2rem',
          marginBottom: '1rem'
         }}>Store Not Found</h1>
        <p style={{ fontFamily: 'monospace', color: '#2c5c94', fontSize: '1.5rem', marginBottom: '1rem' }}>Please create a store first.</p>
        <button 
          onClick={() => navigate('/create-store')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2c5c94',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <span style={{ marginRight: '5px' }}>+</span>
          Create Store
        </button>
      </div>
      </>
    );
  }

  // If user has stores, show all stores
  return (
    <div style={{ padding: 24 }}>
      <h1>All Stores</h1>
      <p>Welcome back, {user.name || user.email}</p>
      <div className="store-list-container">
        <button 
          onClick={() => navigate('/create-store')}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Create New Store
        </button>
        <div className="list">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {shops.map((shop) => (
              <li key={shop._id} style={{ 
                marginBottom: '10px',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: 0 }}>{shop.name}</h3>
                  <p style={{ margin: '5px 0', color: '#666' }}>Code: {shop.code}</p>
                  <p style={{ margin: '5px 0', color: '#666' }}>Type: {shop.type}</p>
                </div>
                <a 
                  href={`/store/${shop.code}`}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Open Store
                </a>
              </li>
            ))}
          </ul>
        </div>
        {shops.length >= 20 && (
          <button 
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

