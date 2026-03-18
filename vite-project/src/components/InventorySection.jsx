import '../Css/InventorySection.css'
import { FaSearch, FaFileExport, FaChevronDown } from 'react-icons/fa';

const InventorySection = () => {

  const products = [
    {
      id: 1,
      name: "Milk 1L",
      sku: "001-MLK",
      category: "Dairy",
      stock: 120,
      cost: 350,
      price: 500,
      status: "in",
    },
    {
      id: 2,
      name: "Bread",
      sku: "002-BRD",
      category: "Bakery",
      stock: 20,
      cost: 700,
      price: 900,
      status: "low",
    },
    {
      id: 3,
      name: "Eggs",
      sku: "003-EGG",
      category: "Dairy",
      stock: 50,
      cost: 1200,
      price: 1500,
      status: "in",
    },
    {
      id: 4,
      name: "Butter",
        sku: "004-BTR",
        category: "Dairy",
        stock: 0,
        cost: 800,
        price: 1200,
        status: "out",
    },
  ];


  return (
    <div className="inventory-body">

      {/* HEADER */}
      <div className="addproduct">
        <h1>Inventory</h1>
        <button className="add-btn">+ Add Product</button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="searchaxis">
        <div className="top-controls">

          <div className="search-area">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search product name or SKU"
              className="search-input"
            />
          </div>

          <div className="controls-right">
            <button className="btn light">Filter</button>

            <select className="select">
              <option>All Category</option>
            </select>

            <select className="select">
              <option>Bulk Actions</option>
            </select>

            <button className="btn apply">Apply</button>

            <button className="btn export">
              <FaFileExport className="export-icon" />
              Export
              <FaChevronDown className="export-icon" />
            </button>
          </div>

        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="table-header">
        <span>Product Name & SKU</span>
        <span>Category</span>
        <span>Stock</span>
        <span>Cost Price</span>
        <span>Selling Price</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {/* TABLE ROWS */}
      {products.map((item) => (
        <div className="table-row" key={item.id}>

          <div className="product-info">
            <input type="checkbox" />
            <div className="product-text">
              <p className="product-name">{item.name}</p>
              <span className="sku">{item.sku}</span>
            </div>
          </div>

          <span>{item.category}</span>
          <span>{item.stock}</span>
          <span>₦{item.cost}</span>
          <span>₦{item.price}</span>

          <span className={`status ${item.status}`}>
            {item.status === "in"
              ? "In Stock"
              : item.status === "low"
              ? "Low Stock"
              : "Out of Stock"}
          </span>

          <div className="actions">
            <button className="edit-btn">Edit ▾</button>
            <button className="more-btn">•••</button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default InventorySection;