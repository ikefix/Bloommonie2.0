import "../Css/WalletSection.css";

import {
  FaWallet,
  FaFileInvoice,
  FaMobileAlt,
  FaBolt,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaHandHoldingUsd,
  FaUserCircle,
} from "react-icons/fa";

const WalletSection = () => {
  return (
    <div className="wallet-section">

      {/* TITLE */}
      <h2 className="wallet-main-title">
        Wallet & Financial Services
      </h2>

      {/* TOP GRID */}
      <div className="wallet-top-grid">

        {/* LEFT SIDE */}
        <div className="wallet-left">

          {/* TOP CARDS */}
          <div className="wallet-info-cards">

            {/* WALLET BALANCE */}
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

            {/* TRANSACTION HISTORY */}
            <div className="transaction-history-card">

              <div className="wallet-card-content">

                <div className="wallet-icon-box blue">
                  <FaFileInvoice className="wallet-icon dark-blue" />
                </div>

                <div className="wallet-text">
                  <h3>Transaction History</h3>

                  <button className="download-btn">
                    Download
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="wallet-actions-wrapper">

            <div className="wallet-actions">

              <div className="action-card add-money">
                <FaMoneyBillWave className="action-icon" />
                <p>Add money</p>
              </div>

              <div className="action-card transfer">
                <FaExchangeAlt className="action-icon" />
                <p>Transfer</p>
              </div>

              <div className="action-card withdraw">
                <FaHandHoldingUsd className="action-icon" />
                <p>Withdraw</p>
              </div>

            </div>

          </div>

          {/* TRANSACTIONS */}
          <div className="transactions-card">

            <div className="transaction-header">
              <h3>Transactions</h3>
              <button>View All ›</button>
            </div>

            <div className="transaction-table">

              <div className="table-head">
                <span>Name</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Date</span>
              </div>

              {/* ROWS */}

              <div className="table-row">
                <div className="name-box">
                  <FaUserCircle />
                  <span>Maria</span>
                </div>

                <span>Purchases</span>

                <span className="green-text">
                  +₦320.07
                </span>

                <span>Jan 27 11:00 am</span>
              </div>

              <div className="table-row">
                <div className="name-box">
                  <FaUserCircle />
                  <span>John</span>
                </div>

                <span>Transfer</span>

                <span className="red-text">
                  -₦150.00
                </span>

                <span>Jan 27 2:15 pm</span>
              </div>

              <div className="table-row">
                <div className="name-box">
                  <FaUserCircle />
                  <span>Pat</span>
                </div>

                <span>Purchases</span>

                <span className="green-text">
                  +₦800.07
                </span>

                <span>Jan 27 11:00 am</span>
              </div>

              <div className="table-row">
                <div className="name-box">
                  <FaUserCircle />
                  <span>Helen</span>
                </div>

                <span>Airtime</span>

                <span className="red-text">
                  -₦500.00
                </span>

                <span>Jan 27 2:15 pm</span>
              </div>

              <div className="table-row">
                <div className="name-box">
                  <FaUserCircle />
                  <span>Helen</span>
                </div>

                <span>Withdrawal</span>

                <span className="red-text">
                  -₦500.00
                </span>

                <span>Jan 27 2:15 pm</span>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="wallet-right">

          {/* QUICK PAYMENTS */}
          <div className="quick-payments-card">

            <div className="quick-header">
              <h3>Quick Payments</h3>
            </div>

            {/* AIRTIME */}
            <div className="quick-payment-item">

              <div className="quick-payment-left">

                <div className="quick-icon-circle orange">
                  <FaMobileAlt className="quick-icon" />
                </div>

                <div className="quick-payment-text">
                  <h4>Airtime & Data</h4>
                  <p>Purchase Airtime & Data</p>

                  <button className="buy-btn">
                    Buy Now
                  </button>
                </div>

              </div>

            </div>

            {/* BILLS */}
            <div className="quick-payment-item">

              <div className="quick-payment-left">

                <div className="quick-icon-circle purple">
                  <FaBolt className="quick-icon" />
                </div>

                <div className="quick-payment-text">
                  <h4>Bills Payment</h4>
                  <p>Pay Electricity, TV & More</p>

                  <button className="bill-btn">
                    Pay Bill
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* WALLET OVERVIEW */}
          <div className="wallet-overview-card">

            <div className="overview-header">
              <h3>Wallet Overview</h3>

              <span className="green-text">
                +₦320.07 Today
              </span>
            </div>

            <div className="graph-placeholder">
              <h2>₦5,240.65</h2>

              <div className="fake-chart"></div>
            </div>

            <div className="overview-footer">
              <span className="green-text">
                +₦320.07 Today
              </span>

              <span>
                +₦320.07 This week ›
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default WalletSection;