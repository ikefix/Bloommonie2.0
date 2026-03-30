# Bloommonie Backend Authentication System Analysis

## 📋 Overview
The Bloommonie backend implements a comprehensive authentication system with multiple authentication methods, security features, and user management capabilities.

## 🔐 Authentication Methods

### 1. **Local Authentication**
- **Registration**: Email + Password + Phone + Terms & Conditions
- **Login**: Email + Password with JWT tokens
- **Password Reset**: Email-based reset with expiry tokens

### 2. **Phone OTP Authentication**
- **Send OTP**: Rate-limited SMS verification (3 OTPs per 15 minutes)
- **Verify OTP**: Time-limited OTP validation (5 minutes expiry)
- **Rate Limiting**: Prevents SMS spam

### 3. **Google OAuth 2.0**
- **OAuth Flow**: Standard Google OAuth2 implementation
- **User Creation**: Auto-creates users from Google profile
- **Account Linking**: Links Google accounts to existing users
- **Token Validation**: Verifies Google ID tokens against client ID

## 🛡️ Security Features

### JWT Token Management
```javascript
// Token extraction and verification
const token = req.header("Authorization")?.replace("Bearer ", "");
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;
```

### Role-Based Authorization
```javascript
// Middleware for role-based access control
export const authorizeseRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
```

### Account Security
- **Login Attempts**: Tracks failed login attempts
- **Account Locking**: Auto-locks after 5 failed attempts (24 hours)
- **Last Login Tracking**: Updates timestamp on successful login
- **Device Management**: Tracks user devices and trusted status

## 👤 User Model Structure

### Core Fields
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required, unique),
  role: String (enum: ["admin", "cashier", "manager"]),
  verified: Boolean (default: false)
}
```

### Authentication Fields
```javascript
{
  authProvider: String (enum: ["local", "google"]),
  googleId: String (Google OAuth ID),
  verificationToken: String (email verification),
  otp: String (hashed OTP),
  resetPasswordToken: String (password reset)
}
```

### Security Fields
```javascript
{
  lastLoginAt: Date,
  loginAttempts: Number,
  accountLocked: Boolean,
  lockedUntil: Date,
  devices: [{
    deviceId: String,
    deviceType: String,
    userAgent: String,
    ipAddress: String,
    lastUsed: Date,
    isTrusted: Boolean
  }]
}
```

### Business Features
```javascript
{
  subscription: String (enum: ["free", "basic", "lite", "business"]),
  kycStatus: String (enum: ["not_started", "pending", "verified", "rejected"]),
  kycDocuments: [{
    type: String (enum: ["id_card", "utility_bill", "passport", "selfie"]),
    url: String,
    status: String,
    uploadedAt: Date
  }],
  referralCode: String (unique, auto-generated),
  referredBy: ObjectId,
  referralCount: Number
}
```

## 🔗 API Endpoints

### Registration & Verification
- `POST /auth/register` - User registration
- `GET /auth/verify-email/:token` - Email verification
- `POST /auth/send-otp` - Send phone OTP
- `POST /auth/verify-otp` - Verify phone OTP

### Authentication
- `POST /auth/login` - Local login
- `GET /auth/google` - Google OAuth initiation
- `POST /auth/google/callback` - Google OAuth callback
- `POST /auth/google/signin` - Google ID token sign-in

### Password Management
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Protected Routes
- `GET /auth/` - Get all users (admin only)
- `POST /auth/create-user` - Create user (admin only)

## 📱 Frontend AuthStore Features

### State Management
```javascript
{
  // Core auth state
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Form states
  registrationData: { name, email, password, phone, termsAndConditionsAccepted },
  otpData: { phone, isOtpSent, isOtpVerified, otpExpiry },
  passwordResetData: { email, resetToken, isResetLinkSent },
  googleAuthData: { isAuthenticating, isGoogleUser }
}
```

### Actions Available
1. **Registration**: `register(userData)`
2. **Email Verification**: `verifyEmail(token)`
3. **Phone OTP**: `sendOtp(phone)`, `verifyOtp(phone, otp)`
4. **Login**: `login(email, password)`
5. **Google Auth**: `initiateGoogleAuth()`, `handleGoogleCallback(code)`
6. **Password Reset**: `forgotPassword(email)`, `resetPassword(token, newPassword)`
7. **Logout**: `logout()`
8. **State Management**: `initializeAuth()`, `updateUser(userData)`, `refreshUserData()`

### Utility Functions
- `hasRole(role)` - Check user role
- `isVerified()` - Check verification status
- `getSubscription()` - Get subscription level
- `isKycVerified()` - Check KYC status
- `getUserProfile()` - Get full user profile

## 🎯 Integration Points

### Backend-Frontend Alignment
✅ **JWT Token Flow**: Backend generates, frontend stores and sends
✅ **Role-Based Access**: Both systems respect user roles
✅ **Multi-Method Auth**: Local, Google OAuth, Phone OTP all supported
✅ **Security Features**: Account locking, rate limiting, device tracking
✅ **Business Logic**: Subscriptions, KYC, referrals all integrated

### Security Best Practices
✅ **Password Hashing**: bcrypt with salt rounds
✅ **Token Security**: JWT with secret key verification
✅ **Rate Limiting**: OTP requests limited per time window
✅ **Input Validation**: All required fields validated
✅ **Error Handling**: Comprehensive error responses
✅ **Data Sanitization**: Proper data cleaning and validation

## 🚀 Recommendations for Frontend

### 1. Use the AuthStore
```javascript
import { useAuthStore } from '../stores/authStore';

const { 
  user, 
  isAuthenticated, 
  login, 
  register, 
  logout,
  hasRole 
} = useAuthStore();
```

### 2. Protected Routes
```javascript
// Use the auth middleware for protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

### 3. API Integration
The authStore automatically handles:
- JWT token management
- Request/response headers
- Error handling
- State persistence
- Loading states

## 📊 System Strengths

1. **Comprehensive**: Multiple auth methods supported
2. **Secure**: Industry-standard security practices
3. **Scalable**: Role-based access control
4. **User-Friendly**: Email verification, OTP, social login
5. **Business-Ready**: KYC, subscriptions, referrals
6. **Well-Structured**: Clear separation of concerns
7. **Maintainable**: Clean code structure and documentation

This authentication system provides a solid foundation for a modern fintech application with enterprise-grade security and user experience features.
