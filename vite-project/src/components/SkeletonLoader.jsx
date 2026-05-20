import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SkeletonLoader() {
  const location = useLocation();
  const [skeletonType, setSkeletonType] = useState('dashboard');

  useEffect(() => {
    // Detect route type based on pathname
    const pathname = location.pathname;
    
    if (pathname.includes('/login') || pathname.includes('/register') || 
        pathname.includes('/forgot-password') || pathname.includes('/reset-password')) {
      setSkeletonType('auth');
    } else if (pathname.includes('/create-store')) {
      setSkeletonType('create-store');
    } else if (pathname.includes('/Inventory') || pathname.includes('/inventory')) {
      setSkeletonType('inventory');
    } else if (pathname.includes('/wallet')) {
      setSkeletonType('wallet');
    } else if (pathname.includes('/ai-mode')) {
      setSkeletonType('ai-mode');
    } else if (pathname.includes('/admin') || pathname.includes('/dashboard')) {
      setSkeletonType('dashboard');
    } else {
      setSkeletonType('dashboard'); // Default to dashboard
    }
  }, [location.pathname]);

  const renderAuthSkeleton = () => (
    <div className="skeleton-auth">
      <div className="skeleton-auth-container">
        <div className="skeleton-auth-header">
          <div className="skeleton-logo-large"></div>
          <div className="skeleton-auth-title"></div>
          <div className="skeleton-auth-subtitle"></div>
        </div>
        <div className="skeleton-auth-form">
          <div className="skeleton-input"></div>
          <div className="skeleton-input"></div>
          <div className="skeleton-button-large"></div>
          <div className="skeleton-divider"></div>
          <div className="skeleton-social-buttons">
            <div className="skeleton-button-social"></div>
            <div className="skeleton-button-social"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateStoreSkeleton = () => (
    <div className="skeleton-create-store">
      <div className="skeleton-create-store-container">
        <div className="skeleton-create-store-header">
          <div className="skeleton-title-large"></div>
          <div className="skeleton-subtitle-medium"></div>
        </div>
        <div className="skeleton-form-grid">
          <div className="skeleton-input-group">
            <div className="skeleton-label"></div>
            <div className="skeleton-input-large"></div>
          </div>
          <div className="skeleton-input-group">
            <div className="skeleton-label"></div>
            <div className="skeleton-input-large"></div>
          </div>
          <div className="skeleton-input-group full-width">
            <div className="skeleton-label"></div>
            <div className="skeleton-textarea"></div>
          </div>
          <div className="skeleton-input-group">
            <div className="skeleton-label"></div>
            <div className="skeleton-input-large"></div>
          </div>
          <div className="skeleton-input-group">
            <div className="skeleton-label"></div>
            <div className="skeleton-input-large"></div>
          </div>
        </div>
        <div className="skeleton-form-actions">
          <div className="skeleton-button-medium"></div>
          <div className="skeleton-button-primary"></div>
        </div>
      </div>
    </div>
  );

  const renderInventorySkeleton = () => (
    <div className="skeleton-inventory">
      {/* Sidebar Skeleton */}
      <div className="skeleton-sidebar">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="skeleton-sidebar-item"></div>
        ))}
      </div>
      <div className="skeleton-inventory-header">
        <div className="skeleton-title-large"></div>
        <div className="skeleton-search-bar"></div>
        <div className="skeleton-button-medium"></div>
      </div>
      <div className="skeleton-inventory-filters">
        <div className="skeleton-filter-chip"></div>
        <div className="skeleton-filter-chip"></div>
        <div className="skeleton-filter-chip"></div>
        <div className="skeleton-filter-chip"></div>
      </div>
      <div className="skeleton-inventory-table">
        <div className="skeleton-table-header">
          <div className="skeleton-table-cell"></div>
          <div className="skeleton-table-cell"></div>
          <div className="skeleton-table-cell"></div>
          <div className="skeleton-table-cell"></div>
          <div className="skeleton-table-cell"></div>
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="skeleton-table-row">
            <div className="skeleton-table-cell"></div>
            <div className="skeleton-table-cell"></div>
            <div className="skeleton-table-cell"></div>
            <div className="skeleton-table-cell"></div>
            <div className="skeleton-table-cell"></div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWalletSkeleton = () => (
    <div className="skeleton-wallet">
      {/* Sidebar Skeleton */}
      <div className="skeleton-sidebar">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="skeleton-sidebar-item"></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="skeleton-wallet-main">
        {/* Search Bar Skeleton */}
        <div className="skeleton-search-bar-container">
          <div className="skeleton-search-bar"></div>
        </div>

        {/* Wallet Section */}
        <div className="skeleton-wallet-section">
          {/* Title */}
          <div className="skeleton-wallet-title"></div>

          {/* Top Row */}
          <div className="skeleton-wallet-top-row">
            {/* Left Column */}
            <div className="skeleton-wallet-left-column">
              {/* Info Cards */}
              <div className="skeleton-wallet-info-cards">
                {/* Wallet Balance Card */}
                <div className="skeleton-wallet-balance-card">
                  <div className="skeleton-wallet-card-content">
                    <div className="skeleton-wallet-icon-circle green"></div>
                    <div className="skeleton-wallet-text">
                      <div className="skeleton-wallet-subtitle"></div>
                      <div className="skeleton-wallet-amount"></div>
                    </div>
                  </div>
                </div>

                {/* Transaction History Card */}
                <div className="skeleton-transaction-history-card">
                  <div className="skeleton-wallet-card-content">
                    <div className="skeleton-wallet-icon-box blue"></div>
                    <div className="skeleton-wallet-text">
                      <div className="skeleton-wallet-subtitle"></div>
                      <div className="skeleton-download-btn"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Payments */}
            <div className="skeleton-quick-payments-card">
              <div className="skeleton-quick-header"></div>
              
              {/* Airtime & Data */}
              <div className="skeleton-quick-payment-item">
                <div className="skeleton-quick-payment-left">
                  <div className="skeleton-quick-icon-circle orange"></div>
                  <div className="skeleton-quick-payment-text">
                    <div className="skeleton-quick-title"></div>
                    <div className="skeleton-quick-description"></div>
                    <div className="skeleton-buy-btn"></div>
                  </div>
                </div>
              </div>

              {/* Bills Payment */}
              <div className="skeleton-quick-payment-item">
                <div className="skeleton-quick-payment-left">
                  <div className="skeleton-quick-icon-circle purple"></div>
                  <div className="skeleton-quick-payment-text">
                    <div className="skeleton-quick-title"></div>
                    <div className="skeleton-quick-description"></div>
                    <div className="skeleton-bill-btn"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAiModeSkeleton = () => (
    <div className="skeleton-ai-mode">
      <div className="skeleton-ai-header">
        <div className="skeleton-title-large"></div>
        <div className="skeleton-subtitle-medium"></div>
      </div>
      <div className="skeleton-ai-chat">
        <div className="skeleton-chat-messages">
          <div className="skeleton-message bot">
            <div className="skeleton-message-avatar"></div>
            <div className="skeleton-message-content">
              <div className="skeleton-message-line"></div>
              <div className="skeleton-message-line medium"></div>
            </div>
          </div>
          <div className="skeleton-message user">
            <div className="skeleton-message-avatar"></div>
            <div className="skeleton-message-content">
              <div className="skeleton-message-line short"></div>
            </div>
          </div>
          <div className="skeleton-message bot">
            <div className="skeleton-message-avatar"></div>
            <div className="skeleton-message-content">
              <div className="skeleton-message-line"></div>
              <div className="skeleton-message-line long"></div>
              <div className="skeleton-message-line medium"></div>
            </div>
          </div>
        </div>
        <div className="skeleton-chat-input">
          <div className="skeleton-input-field"></div>
          <div className="skeleton-send-button"></div>
        </div>
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="skeleton-loader">
      {/* Header Skeleton */}
      <div className="skeleton-header">
        <div className="skeleton-logo"></div>
        <div className="skeleton-nav">
          <div className="skeleton-nav-item"></div>
          <div className="skeleton-nav-item"></div>
          <div className="skeleton-nav-item"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="skeleton-main">
        {/* Sidebar Skeleton */}
        <div className="skeleton-sidebar">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="skeleton-sidebar-item"></div>
          ))}
        </div>

        {/* Content Area Skeleton */}
        <div className="skeleton-content">
          {/* Dashboard Header */}
          <div className="skeleton-dashboard-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-button"></div>
          </div>

          {/* Store Cards Skeleton */}
          <div className="skeleton-store-grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton-store-card">
                <div className="skeleton-store-header"></div>
                <div className="skeleton-store-details">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line medium"></div>
                </div>
                <div className="skeleton-store-actions">
                  <div className="skeleton-button small"></div>
                  <div className="skeleton-button small"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render appropriate skeleton based on route
  const renderSkeleton = () => {
    switch (skeletonType) {
      case 'auth':
        return renderAuthSkeleton();
      case 'create-store':
        return renderCreateStoreSkeleton();
      case 'inventory':
        return renderInventorySkeleton();
      case 'wallet':
        return renderWalletSkeleton();
      case 'ai-mode':
        return renderAiModeSkeleton();
      case 'dashboard':
      default:
        return renderDashboardSkeleton();
    }
  };

  return (
    <>
      {renderSkeleton()}
      <style>{`
        .skeleton-loader {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
        }

        /* Auth Skeleton Styles */
        .skeleton-auth {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .skeleton-auth-container {
          background: white;
          border-radius: 16px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .skeleton-auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .skeleton-logo-large {
          width: 80px;
          height: 80px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 50%;
          margin: 0 auto 20px;
        }

        .skeleton-auth-title {
          width: 200px;
          height: 32px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
          margin: 0 auto 10px;
        }

        .skeleton-auth-subtitle {
          width: 250px;
          height: 20px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin: 0 auto;
        }

        .skeleton-auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skeleton-input {
          height: 50px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-button-large {
          height: 50px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-divider {
          height: 1px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin: 20px 0;
        }

        .skeleton-social-buttons {
          display: flex;
          gap: 10px;
        }

        .skeleton-button-social {
          flex: 1;
          height: 45px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        /* Create Store Skeleton */
        .skeleton-create-store {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 40px 20px;
        }

        .skeleton-create-store-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .skeleton-create-store-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .skeleton-title-large {
          width: 300px;
          height: 40px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
          margin: 0 auto 10px;
        }

        .skeleton-subtitle-medium {
          width: 400px;
          height: 24px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
          margin: 0 auto;
        }

        .skeleton-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }

        .skeleton-input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skeleton-input-group.full-width {
          grid-column: 1 / -1;
        }

        .skeleton-label {
          width: 100px;
          height: 20px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
        }

        .skeleton-input-large {
          height: 50px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-textarea {
          height: 120px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-form-actions {
          display: flex;
          gap: 20px;
          justify-content: flex-end;
        }

        .skeleton-button-medium {
          width: 120px;
          height: 45px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-button-primary {
          width: 150px;
          height: 45px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        /* Inventory Skeleton */
        .skeleton-inventory {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 20px;
        }

        .skeleton-inventory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .skeleton-search-bar {
          width: 300px;
          height: 45px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-inventory-filters {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .skeleton-filter-chip {
          width: 80px;
          height: 32px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 16px;
        }

        .skeleton-inventory-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .skeleton-table-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          gap: 1px;
          background: #f8f9fa;
          padding: 15px;
        }

        .skeleton-table-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          gap: 1px;
          background: white;
          padding: 15px;
          border-top: 1px solid #e9ecef;
        }

        .skeleton-table-cell {
          height: 20px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
        }

        /* Wallet Skeleton - Updated to match actual layout */
        .skeleton-wallet {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          display: flex;
        }

        .skeleton-wallet-main {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skeleton-search-bar-container {
          margin-bottom: 10px;
        }

        .skeleton-wallet-section {
          flex: 1;
        }

        .skeleton-wallet-title {
          width: 300px;
          height: 40px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .skeleton-wallet-top-row {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
        }

        .skeleton-wallet-left-column {
          flex: 1;
        }

        .skeleton-wallet-info-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .skeleton-wallet-balance-card,
        .skeleton-transaction-history-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .skeleton-wallet-card-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .skeleton-wallet-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-wallet-icon-circle.green {
          background: linear-gradient(90deg, rgba(40, 167, 69, 0.2) 25%, rgba(40, 167, 69, 0.3) 50%, rgba(40, 167, 69, 0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-wallet-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-wallet-icon-box.blue {
          background: linear-gradient(90deg, rgba(0, 123, 255, 0.2) 25%, rgba(0, 123, 255, 0.3) 50%, rgba(0, 123, 255, 0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-wallet-text {
          flex: 1;
        }

        .skeleton-wallet-subtitle {
          width: 180px;
          height: 24px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
          margin-bottom: 10px;
        }

        .skeleton-wallet-amount {
          width: 200px;
          height: 36px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
        }

        .skeleton-download-btn {
          width: 100px;
          height: 32px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
          margin-top: 10px;
        }

        .skeleton-quick-payments-card {
          flex: 1;
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .skeleton-quick-header {
          width: 150px;
          height: 32px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
          margin-bottom: 25px;
        }

        .skeleton-quick-payment-item {
          margin-bottom: 25px;
        }

        .skeleton-quick-payment-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .skeleton-quick-icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        .skeleton-quick-icon-circle.orange {
          background: linear-gradient(90deg, rgba(255, 165, 0, 0.2) 25%, rgba(255, 165, 0, 0.3) 50%, rgba(255, 165, 0, 0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-quick-icon-circle.purple {
          background: linear-gradient(90deg, rgba(128, 0, 128, 0.2) 25%, rgba(128, 0, 128, 0.3) 50%, rgba(128, 0, 128, 0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .skeleton-quick-payment-text {
          flex: 1;
        }

        .skeleton-quick-title {
          width: 140px;
          height: 22px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .skeleton-quick-description {
          width: 200px;
          height: 18px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .skeleton-buy-btn,
        .skeleton-bill-btn {
          width: 80px;
          height: 30px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
        }

        /* AI Mode Skeleton */
        .skeleton-ai-mode {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .skeleton-ai-header {
          text-align: center;
          margin-bottom: 30px;
          color: white;
        }

        .skeleton-ai-chat {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 20px;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
        }

        .skeleton-chat-messages {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 20px;
        }

        .skeleton-message {
          display: flex;
          gap: 12px;
          max-width: 70%;
        }

        .skeleton-message.bot {
          align-self: flex-start;
        }

        .skeleton-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .skeleton-message-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .skeleton-message-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skeleton-message-line {
          height: 16px;
          background: linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
        }

        .skeleton-message-line.short {
          width: 60%;
        }

        .skeleton-message-line.medium {
          width: 80%;
        }

        .skeleton-message-line.long {
          width: 100%;
        }

        .skeleton-chat-input {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .skeleton-input-field {
          flex: 1;
          height: 50px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-send-button {
          width: 50px;
          height: 50px;
          background: linear-gradient(90deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 50%;
        }

        /* Original Dashboard Skeleton Styles */
        .skeleton-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 0 20px;
        }

        .skeleton-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-nav {
          display: flex;
          gap: 20px;
        }

        .skeleton-nav-item {
          width: 60px;
          height: 8px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
        }

        .skeleton-main {
          display: flex;
          gap: 20px;
          padding: 0 20px;
        }

        .skeleton-sidebar {
          width: 250px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .skeleton-sidebar-item {
          height: 45px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 8px;
        }

        .skeleton-content {
          flex: 1;
        }

        .skeleton-dashboard-header {
          margin-bottom: 30px;
        }

        .skeleton-title {
          width: 200px;
          height: 32px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
          margin-bottom: 10px;
        }

        .skeleton-subtitle {
          width: 300px;
          height: 20px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .skeleton-button {
          width: 150px;
          height: 40px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 6px;
        }

        .skeleton-button.small {
          width: 80px;
          height: 32px;
        }

        .skeleton-store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
        }

        .skeleton-store-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .skeleton-store-header {
          width: 150px;
          height: 24px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .skeleton-store-details {
          margin-bottom: 20px;
        }

        .skeleton-line {
          height: 16px;
          background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .skeleton-line.short {
          width: 60%;
        }

        .skeleton-line.medium {
          width: 80%;
        }

        .skeleton-store-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        /* Pulse Animation */
        @keyframes pulse {
          0% {
            background-position: 200% 0;
            opacity: 1;
          }
          50% {
            background-position: -200% 0;
            opacity: 0.8;
          }
          100% {
            background-position: 200% 0;
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .skeleton-main {
            flex-direction: column;
          }

          .skeleton-sidebar {
            width: 100%;
            flex-direction: row;
            overflow-x: auto;
          }

          .skeleton-sidebar-item {
            min-width: 100px;
          }

          .skeleton-store-grid {
            grid-template-columns: 1fr;
          }

          .skeleton-form-grid {
            grid-template-columns: 1fr;
          }

          .skeleton-inventory-header {
            flex-direction: column;
            align-items: stretch;
          }

          .skeleton-search-bar {
            width: 100%;
          }

          .skeleton-table-header,
          .skeleton-table-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .skeleton-wallet-actions {
            grid-template-columns: 1fr;
          }

          .skeleton-message {
            max-width: 85%;
          }

          /* Wallet Responsive */
          .skeleton-wallet {
            flex-direction: column;
          }

          .skeleton-wallet-top-row {
            flex-direction: column;
            gap: 20px;
          }

          .skeleton-wallet-card-content {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .skeleton-quick-payment-left {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .skeleton-wallet-title {
            width: 250px;
            margin: 0 auto 20px;
          }
        }
      `}</style>
    </>
  );
}
