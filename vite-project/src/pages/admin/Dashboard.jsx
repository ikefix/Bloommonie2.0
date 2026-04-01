import React from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';
import Box from '../../components/Box';
// import InventoryStatus from '../../components/InventoryStatus';

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Loading...</h1>
        <p>Please wait while we load your dashboard...</p>
      </div>
    );
  }

<<<<<<< HEAD
return (
  <>
    <SideNav />
    <SearchBar />
    <Box />
    {/* <InventoryStatus /> */}

    <div style={{ padding: 24 }}>
      <h1>Admin Dashboard</h1>
      <p>Signed in as: {user?.email}</p>
      
      <div style={{ marginTop: 20 }}>
        <button 
          onClick={() => navigate('/ai-mode')}
          style={{
            marginRight: 10,
            padding: '10px 20px',
            backgroundColor: '#6C63FF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🤖 AI Mode
        </button>
        
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </>
);
=======
  return (
        <>
            <SideNav />
            <SearchBar />
            <Box />
        </>
  );
>>>>>>> 8c9f6a90eedd5fcc64745bf5e2e6e13c08399f2f
}

