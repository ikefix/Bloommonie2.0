export interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
  registrationData: any;
  otpData: any;
  passwordResetData: any;
  googleAuthData: any;
  // actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setAuthState: (authData: any) => void;
  setRegistrationData: (data: any) => void;
  clearRegistrationData: () => void;
  register: (userData: any) => Promise<any>;
  verifyEmail: (token: string) => Promise<any>;
  sendOtp: (phone: string) => Promise<any>;
  verifyOtp: (phone: string, otp: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  initiateGoogleAuth: () => void;
  handleGoogleCallback: (code: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  // optional helpers not currently used
  clearAuthentication?: () => void;
  hasRole: (role: string) => boolean;
  isVerified: () => boolean;
  getSubscription: () => string;
  isKycVerified: () => boolean;
  getUserProfile: () => any;
  updateUser: (userData: any) => void;
  refreshUserData: () => Promise<void>;
}