import '../Css/Box.css';
import { FaDollarSign, FaWallet, FaChartLine, FaFileInvoice } from 'react-icons/fa';

const Box = () => {
  return (
    <div className="box-axisarea">
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
<div className="secondaxis">
    <div className="inventory-status">

      {/* INVENTORY CARD */}
      <div className="inventory-card">

        {/* HEADER */}
        <div className="inventory-header">
          <h2>Inventory Status</h2>
          <button>Manage Inventory</button>
        </div>

        <hr />

        {/* STATS */}
        <div className="inventory-stats">

          <div className="stat">
            <p>Total Product</p>
            <h3 className="green">524</h3>
            <span className="sub green">+12 today</span>
          </div>

          <div className="stat border-left">
            <p>Low Stock</p>
            <h3 className="red">18</h3>
            <span className="sub red">0</span>
          </div>

          <div className="stat border-left">
            <p>Out of Stock</p>
            <h3 className="red">7</h3>
            <span className="sub red">0</span>
          </div>

          <div className="stat border-left">
            <p>Stock Value</p>
            <h3 className="green">₦42,240.00</h3>
          </div>

        </div>
      </div>

    </div>
<div className="inventory-wallet">
  <div className="wallet-card">
    
    {/* HEADER */}
    <div className="wallet-services-header">
      <h2>Wallet & Financial Services</h2>
      <button>₦500k Today ›</button>
    </div>

    <hr />

    {/* BODY */}
    <div className="wallet-services-body">
      
      <div className="wallet-box-left">
        <p>Total Product</p>
        <h3>₦5,240.65</h3>
      </div>

      <div className="wallet-box-right">
        <p>Recent Income</p>
        <h3 className="income">+₦320.07 <span>Today</span></h3>
      </div>

    </div>

    {/* ICON ROW */}
    <div className="wallet-service-icons">
      <div className="service-box green-box"></div>
      <div className="service-box yellow-box"></div>
      <div className="service-box red-box"></div>
      <div className="service-box blue-box"></div>
    </div>

  </div>
</div>
  </div>
    </div>
  );
};

export default Box;