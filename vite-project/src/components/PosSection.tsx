import "../Css/POSSection.css";
import React from "react";

import {
  FaSearch,
  FaPlus,
  FaUserPlus,
  FaWeight,
  FaFileInvoice,
  FaPrint,
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
  FaBarcode,
} from "react-icons/fa";

const POSSection = (): React.ReactElement => {
  return (
    <div className="pos-section">

      {/* MAIN GRID */}
      <div className="pos-grid">

        {/* LEFT PANEL */}
        <div className="current-sale-panel">

          <div className="sale-header">
            <h2>Current Sale</h2>
          </div>

          {/* ITEMS */}
          <div className="sale-items">

            <div className="sale-item">
              <span>1x Milk 1L</span>
              <span>₦2,000</span>
            </div>

            <div className="sale-item">
              <span>2x Apple (per lb)</span>
              <span>₦1,700</span>
            </div>

            <div className="sale-item">
              <span>1x Bread Loaf</span>
              <span>₦3,500</span>
            </div>

            <div className="sale-item">
              <span>1x Chips (Large)</span>
              <span>₦4,200</span>
            </div>

          </div>

          {/* REMOVE BUTTON */}
          <div className="remove-btn-wrapper">
            <button className="remove-btn">
              Remove
            </button>
          </div>

          {/* TOTALS */}
          <div className="totals-box">

            <div className="total-row">
              <span>Subtotal:</span>
              <span>₦4,200</span>
            </div>

            <div className="total-row">
              <span>Tax:</span>
              <span>₦4,200</span>
            </div>

            <div className="grand-total">
              <span>Total:</span>
              <h1>₦4,200</h1>
            </div>

          </div>

          {/* SALE ACTIONS */}
          <div className="sale-action-buttons">

            <button className="clear-sale">
              Clear Sale
            </button>

            <button className="discount-btn">
              Discount
            </button>

            <button className="credit-sale">
              Credit Sale
            </button>

          </div>

          <button className="hold-sale-btn">
            Hold Sale
          </button>

          {/* PAYMENT METHODS */}
          <div className="payment-methods">

            <button>
              <FaMoneyBillWave />
              Cash
            </button>

            <button>
              <FaCreditCard />
              Credit Card
            </button>

            <button>
              <FaCreditCard />
              Debit Card
            </button>

            <button>
              <FaWallet />
              E-Wallet
            </button>

          </div>

          {/* PRINT */}
          <button className="print-btn">
            <FaPrint />
            Print/Email Receipt
          </button>

        </div>

        {/* CENTER PANEL */}
        <div className="product-panel">

          {/* SEARCH */}
          <div className="product-search">

            <input
              type="text"
              placeholder="Product Search"
            />

            <FaSearch className="search-icon" />

          </div>

          {/* CATEGORY TABS */}
          <div className="category-tabs">

            <button className="active-tab">
              All
            </button>

            <button>Fruits</button>
            <button>Dairy</button>
            <button>Snacks</button>
            <button>Beverages</button>

          </div>

          {/* PRODUCTS GRID */}
          <div className="products-grid">

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2909/2909762.png"
                alt=""
              />
              <p>Bananas</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081967.png"
                alt=""
              />
              <p>Orange Juice</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/837/837560.png"
                alt=""
              />
              <p>Eggs</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png"
                alt=""
              />
              <p>Yoghurt</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2553/2553691.png"
                alt=""
              />
              <p>Potato Chips</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2405/2405479.png"
                alt=""
              />
              <p>Soda</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt=""
              />
              <p>Cereal</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3081/3081982.png"
                alt=""
              />
              <p>Ice Cream</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/415/415733.png"
                alt=""
              />
              <p>Apples</p>
            </div>

            <div className="product-card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046786.png"
                alt=""
              />
              <p>Bread</p>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="pos-actions-panel">

          {/* ACTION BUTTONS */}
          <div className="pos-action-buttons">

            <button>
              <FaPlus />
              New Sale
            </button>

            <button>
              <FaSearch />
              Lookup Item
            </button>

            <button>
              <FaUserPlus />
              Add Customer
            </button>

            <button>
              <FaWeight />
              Weight Item
            </button>

            <button>
              <FaFileInvoice />
              Create Invoice
            </button>

          </div>

          {/* NUMBER PAD */}
          <div className="number-pad">

            <button>7</button>
            <button>8</button>
            <button>9</button>

            <button>4</button>
            <button>5</button>
            <button>6</button>

            <button>1</button>
            <button>2</button>
            <button>-</button>

            <button>0</button>
            <button>00</button>
            <button>+</button>

          </div>

          {/* ENTER */}
          <button className="enter-btn">
            Enter
          </button>

          {/* CHARGE */}
          <button className="charge-btn">
            Charge ₦200
          </button>

          {/* FOOTER */}
          <div className="pos-footer">

            <div>
              <FaBarcode />
              Barcode Scanner:
            </div>

            <div>
              <FaPrint />
              Printer:
              <span>Online</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default POSSection;