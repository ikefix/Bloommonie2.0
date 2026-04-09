import React, { useState } from 'react';
import { useShopStore } from '../../../stores/shopStore';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import SideNav from '../../components/sideNav';
import SearchBar from '../../components/SearchBar';
import '../../css/CreateStore.css';

export default function CreateStore() {
  const { createShop, isLoading, addCashierToShop } = useShopStore();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/login');
        }
    };

    console.log(user._id)
  
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
    createdBy: user._id || '',
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

  // State for team member invitation
  const [teamMemberInput, setTeamMemberInput] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [showTeamSuggestions, setShowTeamSuggestions] = useState(false);
  const [addingMember, setAddingMember] = useState(false);

  // Handler functions for team members
  const handleTeamMemberChange = (e) => {
    const value = e.target.value;
    setTeamMemberInput(value);
    setShowTeamSuggestions(value.length > 0);
  };

  const addTeamMember = async (email, name = email) => {
    if (!email || !email.includes('@') || teamMembers.some(m => m.email === email)) {
      return;
    }

    setAddingMember(true);
    try {
      const result = await addCashierToShop('temp', { email, name, role: 'cashier' });
      
      if (result.success) {
        setTeamMembers([...teamMembers, { email, name, status: 'invited' }]);
        setTeamMemberInput('');
        setShowTeamSuggestions(false);
      } else {
        alert(`Failed to invite team member: ${result.error}`);
      }
    } catch (error) {
      alert(`Error inviting team member: ${error.message}`);
    } finally {
      setAddingMember(false);
    }
  };

  const removeTeamMember = (emailToRemove) => {
    const updatedTeamMembers = teamMembers.filter(member => member.email !== emailToRemove);
    setTeamMembers(updatedTeamMembers);
  };

  const handleTeamMemberKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const [name, email] = teamMemberInput.includes(' ') ? teamMemberInput.split(' ') : [teamMemberInput, teamMemberInput];
      addTeamMember(email.trim(), name.trim());
    }
  };

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

  // Local loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWithLoading = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await createShop(formData);
      
      if (result.success) {
        navigate(`/store/${result.data.code}`);
      } else {
        alert(`Error creating store: ${result.error}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-store-container">      
      <div className="create-store-main-content">
        <div className="create-store-header">
          <h1 className="create-store-header-title">Create New Store</h1>
          <p className="create-store-header-subtitle">Set up your business store with our comprehensive management system</p>
          <button 
            onClick={handleLogout}
            className="create-store-logout-btn"
          >
            Logout
          </button>
        </div>

        
        <div className="create-store-form-container">
          <form onSubmit={handleSubmitWithLoading}>
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

            {/* Team Members Section */}
            <div className="create-store-section">
              <h2 className="create-store-section-title">Team Members & Cashiers</h2>
              <p className="create-store-section-description">
                Add team members or cashiers who will have access to this store. They will receive invitation emails to set up their accounts.
              </p>
              
              <div className="create-store-form-group">
                <label className="create-store-label">Add Team Members</label>
                <div className="create-store-collaborator-input-container">
                  <input
                    type="text"
                    value={teamMemberInput}
                    onChange={handleTeamMemberChange}
                    onKeyPress={handleTeamMemberKeyPress}
                    className="create-store-collaborator-input"
                    placeholder="Enter email or 'Name email' and press Enter"
                    disabled={addingMember}
                  />
                  {showTeamSuggestions && (
                    <div className="create-store-collaborator-suggestions">
                      <div className="create-store-collaborator-suggestion-item">
                        Press <strong>Enter</strong> to add {teamMemberInput}
                      </div>
                    </div>
                  )}
                </div>
                
                {teamMembers.length > 0 && (
                  <div className="create-store-collaborators-list">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="create-store-collaborator-item">
                        <div className="create-store-collaborator-avatar">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="create-store-collaborator-info">
                          <div className="create-store-collaborator-email">{member.email}</div>
                          <div className="create-store-collaborator-role">
                            {member.status === 'invited' ? 'Invitation Sent' : 'Pending'}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTeamMember(member.email)}
                          className="create-store-collaborator-remove"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                disabled={isSubmitting}
                className="create-store-button create-store-primary"
              >
                {isSubmitting ? (
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
