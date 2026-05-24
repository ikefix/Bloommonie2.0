import { create } from 'zustand';
import axios from 'axios';
import { useShopStore, shopStore } from './shopStore';
import type { AuthState } from '../types/auth.types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define types for the nested data structures
interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phone: string;
  termsAndConditionsAccepted: boolean;
}

interface OtpData {
  phone: string;
  isOtpSent: boolean;
  isOtpVerified: boolean;
  otpExpiry: Date | null;
}

interface PasswordResetData {
  email: string;
  resetToken: string | null;
  isResetLinkSent: boolean;
}

interface GoogleAuthData {
  isAuthenticating: boolean;
  isGoogleUser: boolean;
}

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  verified?: boolean;
  subscription?: string;
  kycStatus?: string;
  [key: string]: any;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // State
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  // Registration form state
  registrationData: {
    name: '',
    email: '',
    password: '',
    phone: '',
    termsAndConditionsAccepted: false
  },

  // OTP state
  otpData: {
    phone: '',
    isOtpSent: false,
    isOtpVerified: false,
    otpExpiry: null
  },

  // Password reset state
  passwordResetData: {
    email: '',
    resetToken: null,
    isResetLinkSent: false
  },

  // Google auth state
  googleAuthData: {
    isAuthenticating: false,
    isGoogleUser: false
  },

  // Actions
  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  // Authentication Actions
  setAuthState: (authData) => set({
    token: authData.token,
    isAuthenticated: authData.isAuthenticated ?? true,
    user: authData.user,
    isInitializing: false
  }),

  // Registration Actions
  setRegistrationData: (data) => set({ registrationData: { ...get().registrationData, ...data } }),

  clearRegistrationData: () => set({
    registrationData: {
      name: '',
      email: '',
      password: '',
      phone: '',
      termsAndConditionsAccepted: false
    }
  }),

  // User Registration
  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, userData);

      if (response.data.message) {
        set({
          isLoading: false,
          error: null,
          registrationData: {
            ...get().registrationData,
            ...userData
          }
        });
        return { success: true, message: response.data.message };
      }

      return { success: true, user: response.data };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Email Verification
  verifyEmail: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_BASE_URL}/users/verify-email/${token}`);

      if (response.data.user) {
        set({
          isLoading: false,
          error: null,
          user: response.data.user,
          isAuthenticated: true
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Email verification failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Phone OTP Actions
  sendOtp: async (phone) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/users/send-otp`, { phone });

      set({
        isLoading: false,
        error: null,
        otpData: {
          ...get().otpData,
          phone,
          isOtpSent: true
        }
      });

      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'OTP sending failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  verifyOtp: async (phone, otp) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/users/verify-otp`, { phone, otp });

      if (response.data.message?.includes('Phone verified successfully')) {
        set({
          isLoading: false,
          error: null,
          otpData: {
            ...get().otpData,
            isOtpVerified: true
          }
        });
      }

      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Login Actions
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });

      if (response.data.token && response.data.user) {
        const { token, user } = response.data;

        set({
          isLoading: false,
          error: null,
          token,
          user,
          isAuthenticated: true
        });

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { success: true, user };
      }

      return { success: false, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Google Authentication
  initiateGoogleAuth: () => {
    set({
      googleAuthData: {
        ...get().googleAuthData,
        isAuthenticating: true
      }
    });

    window.location.href = `${API_BASE_URL}/users/google`;
  },

  handleGoogleCallback: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_BASE_URL}/users/google/callback?code=${code}`);

      if (response.data.token && response.data.user) {
        const { token, user } = response.data;

        set({
          isLoading: false,
          error: null,
          token,
          user,
          isAuthenticated: true,
          googleAuthData: {
            isAuthenticating: false,
            isGoogleUser: true
          }
        });

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { success: true, user };
      }

      return { success: false, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Google authentication failed';
      set({
        isLoading: false,
        error: errorMessage,
        googleAuthData: {
          isAuthenticating: false,
          isGoogleUser: false
        }
      });
      return { success: false, error: errorMessage };
    }
  },

  // Password Reset Actions
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/users/forgot-password`, { email });

      set({
        isLoading: false,
        error: null,
        passwordResetData: {
          ...get().passwordResetData,
          email,
          isResetLinkSent: true
        }
      });

      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset request failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/users/reset-password`, { token, newPassword });

      set({ isLoading: false });
      return { success: true, message: response.data.message };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  // Logout Action
  logout: () => {
    console.log('Clearing shop data during logout...');
    if (shopStore?.getState) {
      shopStore.getState().clearShopData();
    }

    localStorage.removeItem('currentShop');
    localStorage.removeItem('selectedShop');
    localStorage.removeItem('shops');
    localStorage.removeItem('shop-storage');

    console.log('Shop data cleared successfully');

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: false,
      error: null,
      registrationData: {
        name: '',
        email: '',
        password: '',
        phone: '',
        termsAndConditionsAccepted: false
      },
      otpData: {
        phone: '',
        isOtpSent: false,
        isOtpVerified: false,
        otpExpiry: null
      },
      passwordResetData: {
        email: '',
        resetToken: null,
        isResetLinkSent: false
      },
      googleAuthData: {
        isAuthenticating: false,
        isGoogleUser: false
      }
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Clear authentication (alias for logout)
  clearAuthentication: () => {
    get().logout();
  },

  // Initialize auth state from localStorage and fetch fresh user data
  initializeAuth: async () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user) as User;
        set({
          token,
          user: parsedUser,
          isAuthenticated: true,
          isInitializing: true
        });

        console.log('Fetching user data with token:', token.substring(0, 20) + '...');
        console.log('API URL:', API_BASE_URL);

        const userResponse = await axios.get(`${API_BASE_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('User data response:', userResponse.data);

        if (userResponse.data && userResponse.data.user) {
          const freshUserData = userResponse.data.user || userResponse.data;

          set({
            token,
            user: freshUserData,
            isAuthenticated: true,
            isInitializing: false
          });

          localStorage.setItem('user', JSON.stringify(freshUserData));

          if (userResponse.data.shops) {
            localStorage.setItem('shops', JSON.stringify(userResponse.data.shops));
            console.log('Shops data stored in localStorage:', userResponse.data.shops);
          }
        } else {
          console.log('No user data in response, using localStorage data');
          set({
            token,
            user: parsedUser,
            isAuthenticated: true,
            isInitializing: false
          });
        }

      } catch (error: any) {
        console.error('Failed to fetch fresh user data:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        console.error('Error headers:', error.response?.headers);

        try {
          const parsedUser = JSON.parse(user) as User;
          console.log('Falling back to localStorage data:', parsedUser);
          set({
            token,
            user: parsedUser,
            isAuthenticated: true,
            isInitializing: false
          });
        } catch (parseError) {
          console.error('Failed to parse user data:', parseError);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isInitializing: false
          });
        }
      }
    } else {
      console.log('No token or user found in localStorage');
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isInitializing: false
      });
    }
  },

  // Helper methods
  hasRole: (role: string) => {
    const { user } = get();
    return !!user && user.role === role;
  },

  isVerified: () => {
    const { user } = get();
    return !!user && user.verified === true;
  },

  getSubscription: () => {
    const { user } = get();
    return user?.subscription || 'free';
  },

  isKycVerified: () => {
    const { user } = get();
    return user && user.kycStatus === 'verified';
  },

  getUserProfile: () => {
    const { user } = get();
    return user;
  },

  updateUser: (userData) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      set({ user: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },

  refreshUserData: async () => {
    const { token, user } = get();
    if (!token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        set({ user: response.data });
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }
}));