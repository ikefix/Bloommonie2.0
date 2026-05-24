import React from 'react';
import "./successPage.css";
const SuccessPage: React.FC = () => {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-badge">✓</div>
        <h2>Registration Successful!</h2>
        <p>
          Thank you for registering. Please check your email for verification instructions.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;