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

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/login');
    }
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

  return (
        <>
            <SideNav />
            <SearchBar />
            <Box />
        </>
  );
}

