import "../Css/SalesSection.css";

import {
  FaMoneyBillWave,
  FaFileInvoice,
  FaUndoAlt,
  FaWallet,
  FaSearch,
  FaChevronDown,
  FaCreditCard,
  FaUniversity,
  FaPrint,
  FaEdit,
  FaEye,
  FaPlus,
} from "react-icons/fa";

const SalesSection = () => {
  return (
    <div className="sales-section">

      {/* PAGE TITLE */}
      <h2 className="sales-page-title">Sales</h2>

      {/* TOP CARDS */}
      <div className="sales-top-cards">

        {/* CARD 1 */}
        <div className="sales-card">
          <div className="sales-card-top">

            <div className="sales-icon green-bg">
              <FaMoneyBillWave />
            </div>

            <div className="sales-card-text">
              <h4>Total Sales</h4>
              <h2>₦12,000,000.25</h2>
              <p className="green-text">+6.8%</p>
            </div>

          </div>
        </div>

        {/* CARD 2 */}
        <div className="sales-card">
          <div className="sales-card-top">

            <div className="sales-icon blue-bg">
              <FaFileInvoice />
            </div>

            <div className="sales-card-text">
              <h4>Sales</h4>
              <h2>312</h2>
              <p className="green-text">+28 this month</p>
            </div>

          </div>
        </div>

        {/* CARD 3 */}
        <div className="sales-card">
          <div className="sales-card-top">

            <div className="sales-icon orange-bg">
              <FaUndoAlt />
            </div>

            <div className="sales-card-text">
              <h4>Sales Refunds</h4>
              <h2 className="red-text">₦500,000.25</h2>
              <p className="red-text">15% refunds</p>
            </div>

          </div>
        </div>

        {/* CARD 4 */}
        <div className="sales-card">
          <div className="sales-card-top">

            <div className="sales-icon dark-green-bg">
              <FaWallet />
            </div>

            <div className="sales-card-text">
              <h4>Today's Sales</h4>
              <h2>₦250,000.25</h2>
              <p className="green-text">+₦100,00 Today</p>
            </div>

          </div>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="sales-main-grid">

        {/* LEFT */}
        <div className="sales-left">

          {/* FILTER BAR */}
          <div className="sales-filter-bar">

            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search invoice number or customer"
              />
            </div>

            <select>
              <option>All Staff</option>
            </select>

            <select>
              <option>All Status</option>
            </select>

            <select>
              <option>Last 2 days</option>
            </select>

            <button className="apply-btn">
              Apply
            </button>

            <button className="export-btn">
              Export <FaChevronDown />
            </button>

          </div>

          {/* TABLE CARD */}
          <div className="sales-table-card">

            {/* TABLE HEADER */}
            <div className="sales-table-head">
              <span>Invoice #</span>
              <span>Customer</span>
              <span>Status</span>
              <span>Payment method</span>
              <span>Total Amount</span>
            </div>

            {/* ROW */}

            <div className="sales-row">
              <span>INV-0035</span>
              <span>Maria</span>

              <span className="status completed">
                Completed
              </span>

              <span className="payment-method">
                <FaMoneyBillWave />
                Cash
              </span>

              <span>₦12,000</span>
            </div>

            {/* ROW */}

            <div className="sales-row">
              <span>INV-0036</span>
              <span>James</span>

              <span className="status refunded">
                Refunded
              </span>

              <span className="payment-method">
                <FaCreditCard />
                Credit Card
              </span>

              <span>₦12,000</span>
            </div>

            {/* ROW */}

            <div className="sales-row">
              <span>INV-0037</span>
              <span>Mike</span>

              <span className="status completed">
                Completed
              </span>

              <span className="payment-method">
                <FaUniversity />
                Bank Transfer
              </span>

              <span>₦12,000</span>
            </div>

            {/* ROW */}

            <div className="sales-row">
              <span>INV-0039</span>
              <span>Maria</span>

              <span className="status pending">
                Pending
              </span>

              <span className="payment-method">
                <FaWallet />
                E-Wallet
              </span>

              <span>₦12,000</span>
            </div>

            {/* ROW */}

            <div className="sales-row">
              <span>INV-0040</span>
              <span>John</span>

              <span className="status refunded">
                Refunded
              </span>

              <span className="payment-method">
                <FaWallet />
                E-Wallet
              </span>

              <span>₦12,000</span>
            </div>

            {/* ROW */}

            <div className="sales-row">
              <span>INV-0041</span>
              <span>Clara</span>

              <span className="status completed">
                Completed
              </span>

              <span className="payment-method">
                <FaMoneyBillWave />
                Cash
              </span>

              <span>₦12,000</span>
            </div>

          </div>

          {/* PAGINATION */}
          <div className="pagination">

            <p>Showing 1 to 7 of 7</p>

            <div className="pagination-buttons">

              <button>{"<"}</button>
              <button>1</button>
              <button className="active-page">2</button>
              <button>3</button>
              <button>4</button>
              <button>...</button>
              <button>20</button>
              <button>{">"}</button>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="sales-right">

          {/* ACTION CARD */}
          <div className="invoice-actions-card">

            <button className="invoice-btn green-btn">
              <FaPlus />
              Create Invoice
            </button>

            <button className="invoice-btn blue-btn">
              <FaEye />
              View Invoice
            </button>

            <button className="invoice-btn navy-btn">
              <FaEdit />
              Edit Invoice
            </button>

            <button className="invoice-btn orange-btn">
              <FaPrint />
              Print Invoice
            </button>

          </div>

          {/* GRAPH CARD */}
          <div className="sales-graph-card">

            <h3>Last 7 Days</h3>

            <div className="sales-graph">
              <div className="fake-sales-chart"></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SalesSection;