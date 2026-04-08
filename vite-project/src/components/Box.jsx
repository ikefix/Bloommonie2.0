import '../Css/Box.css';
import {
  FaDollarSign,
  FaWallet,
  FaChartLine,
  FaFileInvoice,
  FaUserCircle,
  FaShoppingBag,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaPiggyBank,
  FaChevronRight,
  FaChevronDown,
} from 'react-icons/fa';

const Box = () => {
  return (
    <div className="box-axisarea">
      {/* ================= FIRST ROW ================= */}
      <div className="box-section">
        {/* SALES */}
        <div className="sales-box-area">
          <div className="box-sales">
            <div className="box-top">
              <div className="icon-circle green">
                <FaDollarSign />
              </div>
              <div className="text">
                <h3>Sales Today</h3>
                <h1>₦1,500,000.00</h1>
              </div>
            </div>
            <h4 className="link">View Sales ›</h4>
          </div>
        </div>

        {/* WALLET */}
        <div className="wallet-box-area">
          <div className="box-wallet">
            <div className="box-top">
              <div className="icon-circle blue">
                <FaWallet />
              </div>
              <div className="text">
                <h3>Wallet Balance</h3>
                <h1>₦3,500,000.00</h1>
              </div>
            </div>
            <button>Add Money</button>
          </div>
        </div>

        {/* DATA */}
        <div className="data-box-area">
          <div className="box-data">
            <div className="box-top">
              <div className="icon-circle orange">
                <FaChartLine />
              </div>
              <div className="text">
                <h3>Airtime & Data</h3>
                <span>Purchase Airtime & Data</span>
              </div>
            </div>
            <button>Buy Now</button>
          </div>
        </div>

        {/* BILLS */}
        <div className="bills-box-area">
          <div className="box-bills">
            <div className="box-top">
              <div className="icon-circle purple">
                <FaFileInvoice />
              </div>
              <div className="text">
                <h3>Bills Payment</h3>
                <span>Pay Electricity, TV & More</span>
              </div>
            </div>
            <h4 className="link-bills">View Bills ›</h4>
          </div>
        </div>
      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="secondaxis">
        <div className="inventory-status">
          <div className="inventory-card">
            <div className="inventory-header">
              <h2>Inventory Status</h2>
              <button>Manage Inventory</button>
            </div>

            <hr />

            <div className="inventory-stats">
              <div className="stat">
                <p>Total Product</p>
                <h3 className="green-text">524</h3>
                <span className="sub green-text">+12 today</span>
              </div>

              <div className="stat border-left">
                <p>Low Stock</p>
                <h3 className="red-text">18</h3>
                <span className="sub red-text">0</span>
              </div>

              <div className="stat border-left">
                <p>Out of Stock</p>
                <h3 className="red-text">7</h3>
                <span className="sub red-text">0</span>
              </div>

              <div className="stat border-left">
                <p>Stock Value</p>
                <h3 className="green-text">₦42,240.00</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="inventory-wallet">
          <div className="wallet-card">
            <div className="wallet-services-header">
              <h2>Wallet & Financial Services</h2>
              <button>₦500k Today ›</button>
            </div>

            <hr />

            <div className="wallet-services-body">
              <div className="wallet-box-left">
                <p>Current Balance</p>
                <h3>₦5,240.65</h3>
              </div>

              <div className="wallet-box-right">
                <p>Recent Income</p>
                <h3 className="income">
                  +₦320.07 <span>Today</span>
                </h3>
              </div>
            </div>

            <div className="wallet-service-icons">
              <div className="service-box green-box"></div>
              <div className="service-box yellow-box"></div>
              <div className="service-box red-box"></div>
              <div className="service-box blue-box"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOWER DASHBOARD GRID ================= */}
      <div className="dashboard-lower-grid">
        {/* LEFT COLUMN */}
        <div className="dashboard-left-column">
          {/* SALES HISTORY */}
          <div className="sales-history-card">
            <div className="sales-history-header">
              <h2>Sales History</h2>
              <button>View All Sales ›</button>
            </div>

            <hr />

            <div className="sales-history-body">
              {/* LEFT LIST */}
              <div className="sales-left-list">
                <div className="sales-row">
                  <div className="sales-user">
                    <FaUserCircle className="row-icon" />
                    <span>Maria</span>
                  </div>
                  <div className="sales-meta">
                    <span>Jan 27</span>
                    <span>55</span>
                  </div>
                </div>

                <div className="sales-row">
                  <div className="sales-user">
                    <FaUserCircle className="row-icon" />
                    <span>James</span>
                  </div>
                  <div className="sales-meta">
                    <span>Jan 24</span>
                    <span>60</span>
                  </div>
                </div>

                <div className="sales-row">
                  <div className="sales-user">
                    <FaUserCircle className="row-icon" />
                    <span>Helen</span>
                  </div>
                  <div className="sales-meta">
                    <span>Jan 24</span>
                    <span>55</span>
                  </div>
                </div>

                <div className="sales-row">
                  <div className="sales-user">
                    <FaUserCircle className="row-icon" />
                    <span>Michael</span>
                  </div>
                  <div className="sales-meta">
                    <span>Jan 19</span>
                    <span>55</span>
                  </div>
                </div>

                <div className="sales-row">
                  <div className="sales-user">
                    <FaUserCircle className="row-icon" />
                    <span>Sophia</span>
                  </div>
                  <div className="sales-meta">
                    <span>Jan 21</span>
                    <span>23</span>
                  </div>
                </div>
              </div>

              {/* RIGHT LIST */}
              <div className="sales-right-list">
                <div className="transaction-row">
                  <div className="transaction-user">
                    <FaShoppingBag className="mini-icon blue-mini" />
                    <span>Maria</span>
                  </div>
                  <span className="amount">₦50,000.00</span>
                </div>

                <div className="transaction-row">
                  <div className="transaction-user">
                    <FaShoppingBag className="mini-icon red-mini" />
                    <span>James</span>
                  </div>
                  <span className="amount">₦2,500.65</span>
                </div>

                <div className="transaction-row">
                  <div className="transaction-user">
                    <FaShoppingBag className="mini-icon purple-mini" />
                    <span>Helen</span>
                  </div>
                  <span className="amount">₦4,500.66</span>
                </div>

                <div className="transaction-row">
                  <div className="transaction-user">
                    <FaShoppingBag className="mini-icon blue-mini" />
                    <span>Michael</span>
                  </div>
                  <span className="amount">₦1,500.09</span>
                </div>

                <div className="transaction-row">
                  <div className="transaction-user">
                    <FaShoppingBag className="mini-icon purple-mini" />
                    <span>Sophia</span>
                  </div>
                  <span className="amount">₦2,500.65</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM QUICK ACTIONS */}
          <div className="bottom-quick-actions-card">
            <div className="bottom-quick-actions-header">
              <h2>Quick Actions</h2>
              <button>View All Sales ›</button>
            </div>

            <hr />

            <div className="bottom-quick-actions-body">
              {/* AIRTIME & DATA */}
              <div className="action-group green-group">
                <div className="group-top">
                  <span>Airtime & Data</span>
                  <span>›</span>
                </div>

                <div className="group-buttons">
                  <button className="small-action-btn green-btn">Buy Airtime</button>
                  <button className="small-action-btn green-btn">Buy Data</button>
                </div>
              </div>

              {/* PAY BILLS */}
              <div className="action-group purple-group">
                <div className="group-top">
                  <span>Pay Bills</span>
                  <span>›</span>
                </div>

                <div className="group-buttons">
                  <button className="small-action-btn purple-btn">Electricity</button>
                  <button className="small-action-btn purple-btn">Cable TV</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-right-column">
          {/* TOP QUICK ACTIONS */}
          <div className="quick-actions-card">
            <div className="quick-actions-header">
              <h2>Quick Actions</h2>
              <button>Last 7 days ›</button>
            </div>

            <hr />

            <div className="quick-actions-body">
              <div className="quick-action green-action">
                <FaMoneyBillWave className="quick-icon" />
                <span>Add Money</span>
              </div>

              <div className="quick-action blue-action">
                <FaExchangeAlt className="quick-icon" />
                <span>Transfer</span>
              </div>

              <div className="quick-action green-action">
                <FaPiggyBank className="quick-icon" />
                <span>Savings</span>
              </div>
            </div>
          </div>

          {/* SALES OVERVIEW */}
          <div className="sales-overview-card">
            <div className="sales-overview-header">
              <h2>Sales Overview</h2>

              <div className="sales-overview-icon-box">
                <FaChevronRight />
                <FaChevronDown />
              </div>
            </div>

            <hr />

            <div className="sales-overview-body">
              <h1>₦5,240.65</h1>

              <div className="chart-area">
                <div className="chart-line"></div>
              </div>

              <div className="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thur</span>
                <span>Fri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;