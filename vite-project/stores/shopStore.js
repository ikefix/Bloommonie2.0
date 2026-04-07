import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useShopStore = create(
  persist(
    (set, get) => ({
      // State
      shops: [],
      currentShop: null,
      isLoading: false,
      error: null,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 20
      },
      
      // Shop Management Actions
      
      // Get all shops for the current user
      fetchShops: async (page = 1, limit = 20, search = '') => {
        set({ isLoading: true, error: null });
        
        try {
          const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
          });
          
          if (search) {
            params.append('search', search);
          }
          
          const response = await axios.get(`${API_BASE_URL}/shops?${params}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({
            shops: response.data.data.shops,
            pagination: response.data.data.pagination,
            isLoading: false
          });
          
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to fetch shops';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Get single shop by ID
      fetchShop: async (shopId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.get(`${API_BASE_URL}/shops/${shopId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({
            currentShop: response.data.data,
            isLoading: false
          });
          
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to fetch shop';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Create new shop
      createShop: async (shopData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Handle location data with map integration
          if (shopData.location && !shopData.location.coordinates) {
            // If coordinates are not provided, you can integrate with a map service here
            // For now, we'll use default coordinates or leave them undefined
            shopData.location.coordinates = {
              latitude: null,
              longitude: null
            };
          }
          
          const response = await axios.post(`${API_BASE_URL}/shops`, shopData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
          
          const newShop = response.data.data;
          
          // Update shops list
          const { shops } = get();
          set({
            shops: [...shops, newShop],
            currentShop: newShop,
            isLoading: false
          });
          
          return { success: true, data: newShop };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to create shop';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Update shop
      updateShop: async (shopId, shopData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.put(`${API_BASE_URL}/shops/${shopId}`, shopData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
          
          const updatedShop = response.data.data;
          
          // Update shops list and current shop
          const { shops, currentShop } = get();
          const updatedShops = shops.map(shop => 
            shop._id === shopId ? updatedShop : shop
          );
          
          set({
            shops: updatedShops,
            currentShop: currentShop?._id === shopId ? updatedShop : currentShop,
            isLoading: false
          });
          
          return { success: true, data: updatedShop };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to update shop';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Delete shop (soft delete)
      deleteShop: async (shopId) => {
        set({ isLoading: true, error: null });
        
        try {
          await axios.delete(`${API_BASE_URL}/shops/${shopId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          // Remove shop from list
          const { shops, currentShop } = get();
          const updatedShops = shops.filter(shop => shop._id !== shopId);
          
          set({
            shops: updatedShops,
            currentShop: currentShop?._id === shopId ? null : currentShop,
            isLoading: false
          });
          
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to delete shop';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Shop Profile Actions
      
      // Get shop profile
      fetchShopProfile: async (shopId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.get(`${API_BASE_URL}/shops/${shopId}/profile`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({ isLoading: false });
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to fetch shop profile';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Update shop profile section
      updateShopProfile: async (shopId, section, profileData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.put(`${API_BASE_URL}/shops/${shopId}/profile`, {
            section,
            ...profileData
          }, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
          
          const updatedShop = response.data.data;
          
          // Update current shop if it's the one being updated
          const { currentShop } = get();
          if (currentShop?._id === shopId) {
            set({ currentShop: updatedShop });
          }
          
          set({ isLoading: false });
          return { success: true, data: updatedShop };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to update shop profile';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Shop Settings Actions
      
      // Update shop settings
      updateShopSettings: async (shopId, settings) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.put(`${API_BASE_URL}/shops/${shopId}/settings`, settings, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
          
          const updatedShop = response.data.data;
          
          // Update current shop if it's the one being updated
          const { currentShop } = get();
          if (currentShop?._id === shopId) {
            set({ currentShop: updatedShop });
          }
          
          set({ isLoading: false });
          return { success: true, data: updatedShop };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to update shop settings';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Shop Operations Actions
      
      // Get shop status
      fetchShopStatus: async (shopId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.get(`${API_BASE_URL}/shops/${shopId}/status`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({ isLoading: false });
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to fetch shop status';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Open shop
      openShop: async (shopId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.post(`${API_BASE_URL}/shops/${shopId}/open`, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({ isLoading: false });
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to open shop';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Close shop
      closeShop: async (shopId) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axios.post(`${API_BASE_URL}/shops/${shopId}/close`, {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({ isLoading: false });
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to close shop';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Shop Analytics Actions
      
      // Get shop analytics
      fetchShopAnalytics: async (shopId, startDate, endDate, period = 'daily') => {
        set({ isLoading: true, error: null });
        
        try {
          const params = new URLSearchParams({
            period,
            startDate,
            endDate
          });
          
          const response = await axios.get(`${API_BASE_URL}/shops/${shopId}/analytics?${params}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          set({ isLoading: false });
          return { success: true, data: response.data.data };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Failed to fetch shop analytics';
          set({ 
            isLoading: false, 
            error: errorMessage 
          });
          return { success: false, error: errorMessage };
        }
      },
      
      // Utility Actions
      
      // Set current shop
      setCurrentShop: (shop) => {
        set({ currentShop: shop });
      },
      
      // Clear current shop
      clearCurrentShop: () => {
        set({ currentShop: null });
      },
      
      // Clear all shop data (for logout)
      clearShopData: () => {
        set({
          shops: [],
          currentShop: null,
          isLoading: false,
          error: null,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
            limit: 20
          }
        });
      },
      
      // Clear error
      clearError: () => {
        set({ error: null });
      },
      
      // Search shops locally
      searchShops: (query) => {
        const { shops } = get();
        if (!query) return shops;
        
        const searchQuery = query.toLowerCase();
        return shops.filter(shop => 
          shop.name.toLowerCase().includes(searchQuery) ||
          shop.code.toLowerCase().includes(searchQuery) ||
          shop.businessInfo?.businessName?.toLowerCase().includes(searchQuery) ||
          shop.address?.city?.toLowerCase().includes(searchQuery) ||
          shop.address?.state?.toLowerCase().includes(searchQuery)
        );
      }
    }),
    {
      name: 'shop-storage',
      partialize: (state) => ({
        currentShop: state.currentShop,
        // Don't persist shops array to avoid stale data
        // Don't persist loading states
      })
    }
  )
);

export { useShopStore };
