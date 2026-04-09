import '../Css/WalletSection.css';
import {
  FaWallet,
  FaFileInvoice,
  FaMobileAlt,
  FaBolt
} from 'react-icons/fa';

const WalletSection = () => {
  return (
    <div className="wallet-section">
      <h2 className="wallet-title">Wallet & Financial Services</h2>

      <div className="wallet-top-row">

        {/* LEFT SIDE */}
        <div className="wallet-left-column">
          
          {/* First two cards */}
          <div className="wallet-info-cards">
            
            {/* Wallet Balance */}
            <div className="wallet-balance-card">
              <div className="wallet-card-content">
                <div className="wallet-icon-circle green">
                  <FaWallet className="wallet-icon" />
                </div>

                <div className="wallet-text">
                  <h3>Wallet Balance</h3>
                  <h1>₦1,500,000.00</h1>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="transaction-history-card">
              <div className="wallet-card-content">
                <div className="wallet-icon-box blue">
                  <FaFileInvoice className="wallet-icon dark-blue" />
                </div>

                <div className="wallet-text">
                  <h3>Transaction History</h3>
                  <button className="download-btn">Download</button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="quick-payments-card">
          <div className="quick-header">
            <h3>Quick Payments</h3>
          </div>

          {/* Airtime & Data */}
          <div className="quick-payment-item">
            <div className="quick-payment-left">
              <div className="quick-icon-circle orange">
                <FaMobileAlt className="quick-icon" />
              </div>

              <div className="quick-payment-text">
                <h4>Airtime & Data</h4>
                <p>Purchase Airtime & Data</p>
                <button className="buy-btn">Buy Now</button>
              </div>
            </div>
          </div>

          {/* Bills Payment */}
          <div className="quick-payment-item">
            <div className="quick-payment-left">
              <div className="quick-icon-circle purple">
                <FaBolt className="quick-icon" />
              </div>

              <div className="quick-payment-text">
                <h4>Bills Payment</h4>
                <p>Pay Electricity, TV & More</p>
                <button className="bill-btn">Pay Bill</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WalletSection;