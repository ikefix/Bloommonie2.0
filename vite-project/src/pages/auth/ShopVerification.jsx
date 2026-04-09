import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ShopVerification() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/verify-shop-access`, {
        code: code.toUpperCase()
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          maxWidth: '450px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            ✅
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#28a745',
            marginBottom: '1rem'
          }}>
            Access Verified!
          </h1>
          <p style={{ color: '#6c757d', marginBottom: '1rem' }}>
            Shop access verified successfully! You can now login.
          </p>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#667eea',
            marginBottom: '10px'
          }}>
            🌸 Bloomrest
          </h1>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '10px'
          }}>
            Shop Access Verification
          </h2>
          <p style={{
            color: '#6c757d',
            fontSize: '0.9rem',
            marginBottom: '20px'
          }}>
            Enter the 6-character verification code sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333'
            }}>
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              required
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '1.1rem',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 'bold',
                boxSizing: 'border-box',
                fontFamily: 'monospace'
              }}
              placeholder="ABC123"
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading || code.length !== 6 ? '#6c757d' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading || code.length !== 6 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
          >
            {loading ? 'Verifying...' : 'Verify Access'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '0.85rem',
          color: '#6c757d'
        }}>
          Check your email for the 6-character verification code
        </div>
      </div>
    </div>
  );
}
