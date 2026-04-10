import React from 'react';

export default function WelcomeModal({ isOpen, onClose, onCreateStore }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        animation: 'slideIn 0.3s ease-out'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '20px'
        }}>
          <span style={{ color: '#28a745' }}>Welcome to Bloomrest! </span>
          <span style={{ fontSize: '2rem' }}> </span>
          <span style={{ fontSize: '2rem', color: '#667eea' }}> </span>
        </div>
        
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '600', 
          color: '#2c3e50',
          marginBottom: '1rem'
        }}>
          Welcome to Bloomrest!
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#6c757d',
          marginBottom: '2rem',
          lineHeight: '1.5'
        }}>
          You haven't created any stores yet. Let's get started by creating your first store and setting up your business management system.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button 
            onClick={onClose}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#545b62';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#6c757d';
            }}
          >
            Maybe Later
          </button>
          
          <button 
            onClick={() => {
              onCreateStore();
              onClose();
            }}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
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
            Create Your First Store
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
