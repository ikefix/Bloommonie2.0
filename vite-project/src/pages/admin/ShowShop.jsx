import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import { useShopStore } from '../../../stores/shopStore';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';

export default function ShowShop() {
  const { user } = useAuthStore();
  const { shops, fetchUserShops } = useShopStore();
  const navigate = useNavigate();

  return (
    <>
      <SideNav />
      <SearchBar />
      <div style={{ padding: 24, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '600', 
              color: '#2c3e50',
              margin: 0
            }}>
              Your Stores
            </h1>
            <p style={{ 
              margin: '5px 0', 
              color: '#6c757d',
              fontSize: '1.1rem'
            }}>
              Welcome back, {user.name || user.email}
            </p>
            <p style={{ 
              margin: 0, 
              color: '#6c757d',
              fontSize: '0.9rem'
            }}>
              {shops.length} {shops.length === 1 ? 'store' : 'stores'} available
            </p>
          </div>
          <button 
            onClick={() => navigate('/create-store')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#218838';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#28a745';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            + Create New Store
          </button>
        </div>

        <div className="store-list-container">
          <div className="list">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {shops.map((shop) => (
                <li key={shop._id} style={{ 
                  marginBottom: '16px',
                  padding: '20px',
                  border: '1px solid #e9ecef',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }} >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: '0 0 8px 0', 
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      color: '#2c3e50'
                    }}>
                      {shop.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <p style={{ 
                        margin: 0, 
                        color: '#6c757d',
                        fontSize: '0.9rem'
                      }}>
                        <strong>Code:</strong> <span style={{ 
                          backgroundColor: '#e9ecef',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontFamily: 'monospace'
                        }}>{shop.code}</span>
                      </p>
                      <p style={{ 
                        margin: 0, 
                        color: '#6c757d',
                        fontSize: '0.9rem'
                      }}>
                        <strong>Type:</strong> {shop.type}
                      </p>
                      {shop.businessInfo?.businessName && (
                        <p style={{ 
                          margin: 0, 
                          color: '#6c757d',
                          fontSize: '0.9rem'
                        }}>
                          <strong>Business:</strong> {shop.businessInfo.businessName}
                        </p>
                      )}
                    </div>
                    {shop.address && (
                      <p style={{ 
                        margin: '8px 0 0 0', 
                        color: '#6c757d',
                        fontSize: '0.85rem'
                      }}>
                        <strong>Location:</strong> {shop.address.city}, {shop.address.state}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => {
                        // Open store in new tab/window like VS Code
                        const storeUrl = `/store/${shop.code}`;
                        window.open(storeUrl, '_blank', 'noopener,noreferrer');
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                      }}
                    >
                      Open Store
                    </button>
                    <button 
                      onClick={() => navigate(`/store/${shop.code}`)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#545b62';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#6c757d';
                      }}
                    >
                      Manage
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {shops.length >= 20 && (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button 
                onClick={() => fetchUserShops()} // Refresh to load more
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#545b62';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                }}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
