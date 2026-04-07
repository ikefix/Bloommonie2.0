import React, { useState } from 'react';
import { useShopStore } from '../../../stores/shopStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';
import '../../css/CreateStore.css';


export default function CreateStore() {
  const { createShop, isLoading } = useShopStore();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {

        if (confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/login');
        }
    };
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'retail',
    description: '',
    businessInfo: {
      businessName: '',
      businessType: '',
      registrationNumber: '',
      taxId: '',
      businessLicense: '',
      vatNumber: '',
      website: '',
      email: user?.email || user?.name || '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Nigeria',
      zipCode: ''
    },
    location: {
      name: '',
      description: '',
      area: 0,
      seatingCapacity: 0,
      parkingSpaces: 0,
      hasStorage: false,
      hasDeliveryService: false,
      operatingHours: {
        monday: { open: '09:00', close: '17:00' },
        tuesday: { open: '09:00', close: '17:00' },
        wednesday: { open: '09:00', close: '17:00' },
        thursday: { open: '09:00', close: '17:00' },
        friday: { open: '09:00', close: '17:00' },
        saturday: { open: '09:00', close: '17:00' },
        sunday: { open: '09:00', close: '17:00' }
      }
    },
    settings: {
      currency: 'NGN',
      timezone: 'Africa/Lagos',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent.includes('.')) {
        const [grandParent, parentProp, childProp] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [grandParent]: {
            ...prev[grandParent],
            [parentProp]: {
              ...prev[grandParent][parentProp],
              [childProp]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await createShop(formData);
    
    if (result.success) {
      navigate(`/store/${result.data.code}`);
    } else {
      alert(`Error creating store: ${result.error}`);
    }
  };

  return (
    <div className="create-store-container">      
      <div className="create-store-main-content">
        <div className="create-store-header">
          <h1 className="create-store-header-title">Create New Store</h1>
          <p className="create-store-header-subtitle">Set up your business store with our comprehensive management system</p>
        <a onClick={handleLogout}>Logout</a>
        </div>

        
        <div className="create-store-form-container">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="create-store-section">
              <h2 className="create-store-section-title">Basic Information</h2>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  Store Name <span className="create-store-required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="Enter your store name"
                />
              </div>

              {console.log(user)}
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  Store Type <span className="create-store-required">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="create-store-select"
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="service">Service</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>
              
              <div className="create-store-form-group">
                <label className="create-store-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="create-store-textarea"
                  placeholder="Describe your store and what makes it unique"
                />
              </div>
            </div>

            {/* Business Information */}
            <div className="create-store-section">
              <h2 className="create-store-section-title">Business Information</h2>
              
              <div className="create-store-form-group">
                <label className="create-store-label">Business Name</label>
                <input
                  type="text"
                  name="businessInfo.businessName"
                  value={formData.businessInfo.businessName}
                  onChange={handleChange}
                  className="create-store-input"
                  placeholder="Legal business name"
                />
              </div>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  Business Email <span className="create-store-required">*</span>
                </label>
                <input
                  type="email"
                  name="businessInfo.email"
                  value={formData.businessInfo.email}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="business@example.com"
                />
              </div>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  Business Phone <span className="create-store-required">*</span>
                </label>
                <input
                  type="tel"
                  name="businessInfo.phone"
                  value={formData.businessInfo.phone}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="create-store-section">
              <h2 className="create-store-section-title">Address Information</h2>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  Street Address <span className="create-store-required">*</span>
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="123 Business Street"
                />
              </div>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  City <span className="create-store-required">*</span>
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="Lagos"
                />
              </div>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  State <span className="create-store-required">*</span>
                </label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="Lagos State"
                />
              </div>
              
              <div className="create-store-form-group">
                <label className="create-store-label">
                  Zip Code <span className="create-store-required">*</span>
                </label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleChange}
                  required
                  className="create-store-input"
                  placeholder="100001"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="create-store-button-group">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="create-store-button create-store-secondary"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="create-store-button create-store-primary"
              >
                {isLoading ? (
                  <>
                    <div className="create-store-loading-spinner"></div>
                    Creating Store...
                  </>
                ) : (
                  <>
                    <span>+</span>
                    Create Store
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
