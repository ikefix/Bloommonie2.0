import { useAuthStore } from '../../../stores/authStore';
import { useShopStore } from '../../../stores/shopStore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';
import Box from '../../components/Box';
import WelcomeModal from '../../components/WelcomeModal';
import ShowShop from './ShowShop';

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { shops, setShops, isLoading } = useShopStore();
  const navigate = useNavigate();
  
  // State for welcome modal
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/login');
    }
  };

  // Fetch user data with shops on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserShops();
    }
  }, [isAuthenticated, user]);

  // Check if user has no stores and show modal
  useEffect(() => {
    if (isAuthenticated && shops && shops.length === 0) {
      setShowWelcomeModal(true);
    }
  }, [isAuthenticated, shops]);

  const fetchUserShops = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.shops) {
          // Update shopStore with fetched shops
          setShops(data.shops);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user shops:', error);
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

  // Return dashboard with modal and shops
  return (
    <>
      <SideNav />
      <SearchBar />
      
      {/* Welcome Modal for users with no stores */}
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onCreateStore={() => navigate('/create-store')}
      />
      <Box />
    </>
  );
}
