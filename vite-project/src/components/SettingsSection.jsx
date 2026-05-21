import "../Css/SettingsSection.css";

import {
  FaStore,
  FaWallet,
  FaReceipt,
  FaPercentage,
  FaLock,
  FaCog
} from "react-icons/fa";

const SettingsSection = () => {
  return (

    <div className="settings-section">

      {/* TOP TITLE */}

      <h1 className="settings-title">Settings</h1>

      {/* SETTINGS CARDS */}

      <div className="settings-cards">

        <div className="settings-card">
          <div className="settings-icon blue">
            <FaStore />
          </div>

          <div className="settings-text">
            <h3>Store Settings</h3>
            <p>General store information & preferences</p>
            <span>08141933337</span>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon navy">
            <FaWallet />
          </div>

          <div className="settings-text">
            <h3>Payment Methods</h3>
            <p>Manage accepted payment options</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon orange">
            <FaReceipt />
          </div>

          <div className="settings-text">
            <h3>Reciept Settings</h3>
            <p>Customize receipt appearance and content</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon dark">
            <FaPercentage />
          </div>

          <div className="settings-text">
            <h3>Tax Settings</h3>
            <p>Configure tax rates and calculations</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon red">
            <FaLock />
          </div>

          <div className="settings-text">
            <h3>Security & Permissions</h3>
            <p>User roles, permissions and security settings</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon purple">
            <FaCog />
          </div>

          <div className="settings-text">
            <h3>System Preferences</h3>
            <p>Miscellaneous system options and preferences</p>
          </div>
        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="settings-main-grid">

        {/* LEFT */}

        <div className="store-settings-card">

          <h2>Store Settings</h2>

          <div className="store-form">

            <div className="form-row">
              <label>Store Name</label>
              <input type="text" placeholder="Bloom Supermarket Pro" />
            </div>

            <div className="form-row">
              <label>Store Location</label>
              <input type="text" placeholder="Rumuagholu Road, Port Harcourt" />
            </div>

            <div className="form-row">
              <label>Phone Number</label>
              <input type="text" placeholder="+234-800-123-4567" />
            </div>

            <div className="form-row">
              <label>Email Address</label>
              <input type="email" placeholder="supermarket@domain.com" />
            </div>

            <div className="advanced-settings">
              View advanced store settings ››
            </div>

            <button className="save-btn">
              Save Changes
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="settings-right-side">

          {/* SALES OVERVIEW */}

          <div className="sales-overview-card">

            <div className="overview-row">
              <h4>Total Sales</h4>
              <span>₦12,000.00</span>
            </div>

            <div className="overview-row">
              <h4>Total Invoice</h4>
              <span>355</span>
            </div>

            <div className="overview-row">
              <h4>Sales Refunds</h4>
              <span className="red-text">₦280.00</span>
            </div>

            <div className="last-seven">
              <h3>Last 7 Days</h3>
              <span>›</span>
            </div>

            <div className="sales-footer">
              <h1>₦25,00</h1>
              <h2>Total Sales</h2>
            </div>

          </div>

          {/* SECURITY */}

          <div className="security-card">

            <h2>Security Settings</h2>

            <div className="security-row">

              <div>
                <h4>Two Factor Authentication (2FA)</h4>
                <p>Manage Authentication Apps</p>
              </div>

              <div className="toggle-switch active">
                <div className="toggle-circle"></div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 2FA BOTTOM */}

      <div className="two-factor-card">

        <h2>Enable Two-Factor Authentication (2FA)</h2>

        <p>
          Add an extra layer of security to your account by enabling 2FA
        </p>

      </div>

    </div>

  );
};

export default SettingsSection;