import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';
import Box from '../../components/Box';
// import InventoryStatus from '../../components/InventoryStatus';

export default function Admin() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
        <>
            <SideNav />
            <SearchBar />
            <Box />
            {/* <InventoryStatus /> */}
        </>
  );
}

