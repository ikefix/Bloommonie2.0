import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAiModeStore } from '../../stores/aiModeStore';
import { useElectronAiModeStore } from '../../stores/electronAiModeStore';
import { speechManager } from '../../utils/speechUtils';
import './AIMode.css';

const AIMode = () => {
  const navigate = useNavigate();
  
  // Use the main aiModeStore for core functionality
  const {
    isAiModeActive,
    isListening,
    isProcessing,
    currentTranscript,
    lastCommand,
    commandHistory,
    searchResults,
    externalProducts,
    productsToStore,
    isSearching,
    isLoadingExternal,
    toggleAiMode,
    startListening,
    stopListening,
    speak,
    clearCommandHistory,
    clearSearchResults,
    addProductToStore,
    removeProductToStore,
    navigateToReports,
    navigateToStaff,
    navigateToDashboard,
    navigateToPos
  } = useAiModeStore();

  // Use electronAiModeStore for Electron-specific features
  const {
    isElectron,
    systemInfo
  } = useElectronAiModeStore();

  const [showCommandHistory, setShowCommandHistory] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showExternalProducts, setShowExternalProducts] = useState(false);
  const [showStoreManagement, setShowStoreManagement] = useState(false);

  useEffect(() => {
    // Initialize voices when component mounts
    if (speechManager.isSupported.synthesis) {
      speechManager.getVoices();
    }
    
    // Initialize Electron features if available (using main store)
    if (isElectron) {
      // The initializeElectron method is now in the main store
      // It will be called when AI mode is toggled
      console.log('Electron environment detected');
    }
  }, [isElectron]);

  const handleToggleAiMode = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (e?.stopPropagation) e.stopPropagation();

    const nextIsActive = !isAiModeActive;
    await toggleAiMode();

    if (nextIsActive) {
      await speak("AI Mode activated. I'm ready to help you manage your business.");
    } else {
      await speak('AI Mode deactivated.');
    }
  };

  const handleStartListening = () => {
    startListening();
    speak('I\'m listening. Please speak your command.');
  };

  const handleStopListening = () => {
    stopListening();
    speak('Stopped listening.');
  };

  const handleTestCommand = () => {
    const testCommands = [
      'Check my balance',
      'Show me my inventory',
      'Buy laptop and mouse',
      'Generate sales report',
      'Open point of sale'
    ];
    
    const randomCommand = testCommands[Math.floor(Math.random() * testCommands.length)];
    speak(`Testing command: ${randomCommand}`);
  };

  const handleAddExternalProduct = (product) => {
    addProductToStore(product);
    speak(`Added ${product.name} to your store inventory.`);
  };

  const handleStoreProducts = async () => {
    if (productsToStore.length === 0) {
      speak('No products to store.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const promises = productsToStore.map(product =>
        fetch('http://localhost:5000/api/inventory/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: product.name,
            description: product.description || `Imported product: ${product.name}`,
            purchasePrice: 0,
            sellingPrice: 0,
            category: null,
            brand: product.brand || 'Unknown',
            unit: null,
            stock: {
              currentStock: 0,
              minimumStock: 1,
              maximumStock: 100
            },
            isActive: true,
            isTrackable: true,
            tags: ['imported', 'external']
          })
        })
      );

      await Promise.all(promises);
      speak(`Successfully added ${productsToStore.length} products to your inventory.`);
      clearSearchResults();
      setShowStoreManagement(false);
    } catch (error) {
      console.error('Error storing products:', error);
      speak('Sorry, I couldn\'t add the products to your inventory.');
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getIntentColor = (intent) => {
    const colors = {
      BUY: '#4CAF50',
      SELL: '#2196F3',
      STOCK: '#FF9800',
      BALANCE: '#9C27B0',
      TRANSFER: '#00BCD4',
      REPORTS: '#795548',
      STAFF: '#607D8B',
      DASHBOARD: '#3F51B5',
      POS: '#E91E63',
      UNKNOWN: '#9E9E9E'
    };
    return colors[intent] || colors.UNKNOWN;
  };

  return (
    <div className="ai-mode-container">
      {/* Custom Window Controls for Electron */}
      {isElectron && (
        <div className="window-controls">
          <button className="window-control minimize" onClick={() => window.electron.aiMode.minimizeApp()}>
            &#8212;
          </button>
          <button className="window-control maximize" onClick={() => window.electron.aiMode.maximizeApp()}>
            &#9633;
          </button>
          <button className="window-control close" onClick={() => window.electron.aiMode.closeApp()}>
            &#10005;
          </button>
        </div>
      )}

      <header className="ai-mode-header">
        <h1>🤖 AI Mode</h1>
        <p>Control your business with voice commands</p>
      </header>

      <div className="ai-mode-content">
        {/* System Info Card - Electron Only */}
      {isElectron && systemInfo && (
        <div className="system-info-card">
          <h3>🖥️ System Information</h3>
          <div className="system-details">
            <div className="system-item">
              <span className="system-label">Platform:</span>
              <span className="system-value">{systemInfo.platform}</span>
            </div>
            <div className="system-item">
              <span className="system-label">Electron Version:</span>
              <span className="system-value">{systemInfo.electronVersion}</span>
            </div>
            <div className="system-item">
              <span className="system-label">Node Version:</span>
              <span className="system-value">{systemInfo.nodeVersion}</span>
            </div>
            <div className="system-item">
              <span className="system-label">Chrome Version:</span>
              <span className="system-value">{systemInfo.chromeVersion}</span>
            </div>
            <div className="system-item">
              <span className="system-label">App Version:</span>
              <span className="system-value">{systemInfo.appVersion}</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Mode Toggle */}
        <div className="ai-status-card">
          <div className="status-header">
            <h2>AI Mode Status</h2>
            <button
              className={`toggle-btn ${isAiModeActive ? 'active' : ''}`}
              onClick={handleToggleAiMode}
            >
              {isAiModeActive ? '🟢 Active' : '🔴 Inactive'}
            </button>
          </div>
          
          {isAiModeActive && (
            <div className="voice-controls">
              <button
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={isListening ? handleStopListening : handleStartListening}
                disabled={isProcessing}
              >
                {isListening ? '🎤 Stop Listening' : '🎤 Start Listening'}
              </button>
              
              <button
                className="test-btn"
                onClick={handleTestCommand}
                disabled={isProcessing}
              >
                🧪 Test Command
              </button>
            </div>
          )}
        </div>

        {/* Current Transcript */}
        {currentTranscript && (
          <div className="transcript-card">
            <h3>Current Transcript</h3>
            <p className="transcript-text">"{currentTranscript}"</p>
          </div>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <div className="processing-card">
            <div className="spinner"></div>
            <p>Processing your command...</p>
          </div>
        )}

        {/* Last Command */}
        {lastCommand && (
          <div className="last-command-card">
            <h3>Last Command</h3>
            <div className="command-details">
              <span className="command-text">"{lastCommand.transcript}"</span>
              <span 
                className="command-intent"
                style={{ backgroundColor: getIntentColor(lastCommand.intent) }}
              >
                {lastCommand.intent}
              </span>
              <span className="command-time">
                {formatTimestamp(lastCommand.timestamp)}
              </span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button onClick={() => setShowCommandHistory(!showCommandHistory)}>
              📜 Command History
            </button>
            <button onClick={() => setShowSearchResults(!showSearchResults)}>
              🔍 Search Results
            </button>
            <button onClick={() => setShowExternalProducts(!showExternalProducts)}>
              🌐 External Products
            </button>
            <button onClick={() => setShowStoreManagement(!showStoreManagement)}>
              📦 Store Management
            </button>
          </div>
        </div>

        {/* Command History */}
        {showCommandHistory && (
          <div className="command-history-card">
            <div className="card-header">
              <h3>Command History</h3>
              <button onClick={clearCommandHistory}>Clear</button>
            </div>
            <div className="history-list">
              {commandHistory.length === 0 ? (
                <p>No commands yet</p>
              ) : (
                commandHistory.map((cmd, index) => (
                  <div key={index} className="history-item">
                    <span className="history-text">"{cmd.transcript}"</span>
                    <span 
                      className="history-intent"
                      style={{ backgroundColor: getIntentColor(cmd.intent) }}
                    >
                      {cmd.intent}
                    </span>
                    <span className="history-time">
                      {formatTimestamp(cmd.timestamp)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showSearchResults && (
          <div className="search-results-card">
            <div className="card-header">
              <h3>Local Search Results</h3>
              <button onClick={clearSearchResults}>Clear</button>
            </div>
            {isSearching ? (
              <div className="loading">Searching...</div>
            ) : searchResults.length === 0 ? (
              <p>No products found in your inventory</p>
            ) : (
              <div className="results-grid">
                {searchResults.map((product, index) => (
                  <div key={index} className="product-card">
                    <h4>{product.name}</h4>
                    <p>SKU: {product.sku}</p>
                    <p>Stock: {product.stock?.currentStock || 0}</p>
                    <p>Price: ₦{product.sellingPrice?.toLocaleString() || 0}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* External Products */}
        {showExternalProducts && (
          <div className="external-products-card">
            <div className="card-header">
              <h3>External Products</h3>
              <button onClick={clearSearchResults}>Clear</button>
            </div>
            {isLoadingExternal ? (
              <div className="loading">Searching online...</div>
            ) : externalProducts.length === 0 ? (
              <p>No external products found</p>
            ) : (
              <div className="results-grid">
                {externalProducts.map((product, index) => (
                  <div key={index} className="product-card external">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="product-image" />
                    )}
                    <h4>{product.name}</h4>
                    <p>Brand: {product.brand || 'Unknown'}</p>
                    <p>Category: {product.category || 'Unknown'}</p>
                    <button onClick={() => handleAddExternalProduct(product)}>
                      Add to Store
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Store Management */}
        {showStoreManagement && (
          <div className="store-management-card">
            <div className="card-header">
              <h3>Products to Store</h3>
              <div>
                <button onClick={handleStoreProducts} disabled={productsToStore.length === 0}>
                  Store All Products
                </button>
                <button onClick={clearSearchResults}>Clear</button>
              </div>
            </div>
            {productsToStore.length === 0 ? (
              <p>No products to store</p>
            ) : (
              <div className="store-list">
                {productsToStore.map((product, index) => (
                  <div key={index} className="store-item">
                    <span>{product.name}</span>
                    <button onClick={() => removeProductToStore(product.id || index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="help-card">
          <h3>🎯 Voice Commands</h3>
          <div className="commands-grid">
            <div className="command-group">
              <h4>💰 Buy & Sell</h4>
              <ul>
                <li>"Buy laptop and mouse"</li>
                <li>"Purchase 5 cartons of milk"</li>
                <li>"Sell these items"</li>
                <li>"Open checkout"</li>
              </ul>
            </div>
            <div className="command-group">
              <h4>📊 Business Operations</h4>
              <ul>
                <li>"Check my balance"</li>
                <li>"Show inventory"</li>
                <li>"Generate sales report"</li>
                <li>"Transfer ₦5000 to John"</li>
              </ul>
            </div>
            <div className="command-group">
              <h4>👥 Management</h4>
              <ul>
                <li>"Show staff attendance"</li>
                <li>"Open dashboard"</li>
                <li>"Check expenses"</li>
                <li>"View reports"</li>
              </ul>
            </div>
            <div className="command-group">
              <h4>🔍 Navigation</h4>
              <ul>
                <li>"Go to dashboard"</li>
                <li>"Open point of sale"</li>
                <li>"Show inventory management"</li>
                <li>"Navigate to staff"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMode;
