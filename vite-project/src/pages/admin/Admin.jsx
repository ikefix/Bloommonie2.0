import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
  );
}
