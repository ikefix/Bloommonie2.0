// API Configuration for Bloommonie2.0 AI Mode System
// This file contains all API endpoints and base URLs for the application

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const FRONTEND_BASE = import.meta.env.VITE_FRONTEND_BASE || 'http://localhost:5173';

const API_CONFIG = {
  // Base URLs
  BASE_URL: API_BASE_URL,
  FRONTEND_BASE: FRONTEND_BASE,
  
  // Authentication Routes
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    GET_USERS: '/auth/users',
    CREATE_USER: '/auth/create-user',
  },

  // POS System Routes
  POS: {
    BASE: '/pos',
    CART: '/pos/cart',
    CART_ADD: '/pos/cart/add',
    CART_UPDATE: '/pos/cart/update',
    CART_REMOVE: '/pos/cart/:productId',
    CART_CLEAR: '/pos/cart',
    CART_CUSTOMER: '/pos/cart/customer',
    CUSTOMERS_SEARCH: '/pos/customers/search',
    CUSTOMERS_CREATE: '/pos/customers',
    DISCOUNTS: '/pos/discounts',
    DISCOUNTS_APPLY: '/pos/cart/discount',
    DISCOUNTS_REMOVE: '/pos/cart/discount',
    CHECKOUT: '/pos/checkout',
    RECEIPT: '/pos/receipt/:saleId',
    RECEIPT_EMAIL: '/pos/receipt/:saleId/email',
    SALES_SUMMARY: '/pos/sales/summary',
    SALES_HISTORY: '/pos/sales',
  },

  // Inventory Management Routes
  INVENTORY: {
    BASE: '/inventory',
    PRODUCTS: '/inventory/products',
    PRODUCT_DETAIL: '/inventory/products/:id',
    CATEGORIES: '/inventory/categories',
    CATEGORIES_ROOT: '/inventory/categories/root',
    BRANDS: '/inventory/brands',
    UNITS: '/inventory/units',
    STOCK_LOW: '/inventory/stock/low-stock',
    STOCK_OUT: '/inventory/stock/out-of-stock',
    STOCK_ADJUSTMENT: '/inventory/stock/adjustment',
    STOCK_MOVEMENTS: '/inventory/stock/movements/:id',
    STOCK_TRANSFER: '/inventory/stock/transfer',
    STOCK_TRANSFER_PENDING: '/inventory/stock/transfer/pending',
    STOCK_TRANSFER_APPROVE: '/inventory/stock/transfer/:id/approve',
    STOCK_TRANSFER_COMPLETE: '/inventory/stock/transfer/:id/complete',
    STOCK_TRANSFER_CANCEL: '/inventory/stock/transfer/:id/cancel',
    STOCK_TRANSFER_HISTORY: '/inventory/stock/transfer/history',
    DASHBOARD: '/inventory/dashboard',
  },

  // Wallet System Routes
  WALLET: {
    BASE: '/wallet-v2',
    BALANCE: '/wallet-v2/balance',
    SUMMARY: '/wallet-v2/summary',
    ADD_MONEY: '/wallet-v2/add-money',
    WITHDRAW: '/wallet-v2/withdraw',
    TRANSFER: '/wallet-v2/transfer',
    TRANSACTIONS: '/wallet-v2/transactions',
    CREATE_RECIPIENT: '/wallet-v2/create-recipient',
    BANKS: '/wallet-v2/banks',
    RESOLVE_ACCOUNT: '/wallet-v2/resolve-account',
    LOCK_FUNDS: '/wallet-v2/lock-funds',
    UNLOCK_FUNDS: '/wallet-v2/unlock-funds',
  },

  // Payment Processing Routes
  PAYMENT: {
    BASE: '/payment-v2',
    INITIALIZE: '/payment-v2/initialize',
    VERIFY: '/payment-v2/verify/:reference',
    STATUS: '/payment-v2/status/:reference',
    METHODS: '/payment-v2/methods',
    HISTORY: '/payment-v2/history',
    WEBHOOK: '/payment-v2/webhook',
    STATS: '/payment-v2/stats',
  },

  // Virtual Bank Accounts Routes
  VIRTUAL_ACCOUNT: {
    BASE: '/virtual-account',
    CREATE: '/virtual-account/create',
    GET: '/virtual-account',
    RESTRICTIONS: '/virtual-account/restrictions',
    DEACTIVATE: '/virtual-account/deactivate',
    WEBHOOK: '/virtual-account/webhook',
    TRANSACTIONS: '/virtual-account/transactions',
  },

  // Savings System Routes
  SAVINGS: {
    BASE: '/savings',
    CREATE: '/savings/create',
    LIST: '/savings',
    DETAIL: '/savings/:id',
    CONTRIBUTE: '/savings/:id/contribute',
    WITHDRAW: '/savings/:id/withdraw',
    TRANSACTIONS: '/savings/:id/transactions',
    UPDATE: '/savings/:id',
    CLOSE: '/savings/:id/close',
    STATS_OVERVIEW: '/savings/stats/overview',
    MIGRATION_STATUS: '/savings/migration-status',
    MIGRATE: '/savings/migrate',
  },

  // Sales Management Routes
  SALES: {
    BASE: '/sales',
    LIST: '/sales',
    DETAIL: '/sales/:id',
    CREATE: '/sales',
    UPDATE: '/sales/:id',
    DELETE: '/sales/:id',
    ANALYTICS: '/sales/analytics',
    REPORTS: '/sales/reports',
    DASHBOARD: '/sales/dashboard',
  },

  // Purchase Management Routes
  PURCHASE: {
    BASE: '/purchase',
    LIST: '/purchase',
    DETAIL: '/purchase/:id',
    CREATE: '/purchase',
    UPDATE: '/purchase/:id',
    DELETE: '/purchase/:id',
    APPROVE: '/purchase/:id/approve',
    RECEIVE: '/purchase/:id/receive',
    SUPPLIERS: '/purchase/suppliers',
    ORDERS: '/purchase/orders',
  },

  // Expense Management Routes
  EXPENSE: {
    BASE: '/expense',
    LIST: '/expense',
    DETAIL: '/expense/:id',
    CREATE: '/expense',
    UPDATE: '/expense/:id',
    DELETE: '/expense/:id',
    CATEGORIES: '/expense/categories',
    REPORTS: '/expense/reports',
    APPROVE: '/expense/:id/approve',
  },

  // Staff Management Routes
  STAFF: {
    BASE: '/staff',
    LIST: '/staff',
    DETAIL: '/staff/:id',
    CREATE: '/staff',
    UPDATE: '/staff/:id',
    DELETE: '/staff/:id',
    ATTENDANCE: '/staff/attendance',
    PAYROLL: '/staff/payroll',
    PERFORMANCE: '/staff/performance',
    ROLES: '/staff/roles',
    PERMISSIONS: '/staff/permissions',
  },

  // Reports and Analytics Routes
  REPORTS: {
    BASE: '/reports',
    SALES: '/reports/sales',
    INVENTORY: '/reports/inventory',
    FINANCIAL: '/reports/financial',
    EXPENSES: '/reports/expenses',
    STAFF: '/reports/staff',
    DASHBOARD: '/reports/dashboard',
    EXPORT: '/reports/export',
    ANALYTICS: '/reports/analytics',
  },

  // Shop/E-commerce Routes
  SHOP: {
    BASE: '/shop',
    PRODUCTS: '/shop/products',
    CATEGORIES: '/shop/categories',
    CART: '/shop/cart',
    ORDERS: '/shop/orders',
    CHECKOUT: '/shop/checkout',
    PAYMENT: '/shop/payment',
    SHIPPING: '/shop/shipping',
    RETURNS: '/shop/returns',
    REVIEWS: '/shop/reviews',
  },

  // Invoice System Routes
  INVOICE: {
    BASE: '/invoice',
    LIST: '/invoice',
    DETAIL: '/invoice/:id',
    CREATE: '/invoice',
    UPDATE: '/invoice/:id',
    DELETE: '/invoice/:id',
    SEND: '/invoice/:id/send',
    PAID: '/invoice/:id/paid',
    OVERDUE: '/invoice/overdue',
  },

  // Admin Routes
  ADMIN: {
    BASE: '/admin',
    USERS: '/admin/users',
    ROLES: '/admin/roles',
    PERMISSIONS: '/admin/permissions',
    SETTINGS: '/admin/settings',
    LOGS: '/admin/logs',
    BACKUP: '/admin/backup',
    FRAUD_ALERTS: '/admin/fraud-alerts',
    SYSTEM_HEALTH: '/admin/system-health',
  },
};

// Voice Command Keywords Mapping
const VOICE_COMMANDS = {
  // Buy/Sell Commands
  BUY: ['buy', 'purchase', 'order', 'get', 'acquire'],
  SELL: ['sell', 'sale', 'checkout', 'process sale'],
  
  // Inventory Commands
  STOCK: ['stock', 'inventory', 'check stock', 'product count'],
  ADD_PRODUCT: ['add product', 'new product', 'create product'],
  SEARCH_PRODUCT: ['search', 'find', 'lookup', 'product search'],
  
  // Wallet Commands
  BALANCE: ['balance', 'account balance', 'wallet balance', 'check balance'],
  TRANSFER: ['transfer', 'send money', 'payment'],
  WITHDRAW: ['withdraw', 'cash out', 'get money'],
  
  // Reports Commands
  REPORTS: ['reports', 'analytics', 'sales report', 'financial report'],
  SALES: ['sales', 'today sales', 'sales summary'],
  
  // Staff Commands
  STAFF: ['staff', 'employees', 'team', 'workers'],
  ATTENDANCE: ['attendance', 'check in', 'check out'],
  
  // Settings Commands
  SETTINGS: ['settings', 'configuration', 'setup'],
  
  // Navigation Commands
  DASHBOARD: ['dashboard', 'home', 'main'],
  POS: ['pos', 'checkout', 'sell', 'point of sale'],
};

// Helper function to get full URL
const getFullUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to detect intent from voice command
const detectIntent = (transcript) => {
  const lowerTranscript = transcript.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(VOICE_COMMANDS)) {
    for (const keyword of keywords) {
      if (lowerTranscript.includes(keyword)) {
        return intent;
      }
    }
  }
  
  return 'UNKNOWN';
};

// Helper function to get relevant endpoints for intent
const getEndpointsForIntent = (intent) => {
  const intentMap = {
    BUY: [API_CONFIG.POS.CART_ADD, API_CONFIG.INVENTORY.PRODUCTS],
    SELL: [API_CONFIG.POS.CHECKOUT, API_CONFIG.SALES.CREATE],
    STOCK: [API_CONFIG.INVENTORY.STOCK_LOW, API_CONFIG.INVENTORY.PRODUCTS],
    BALANCE: [API_CONFIG.WALLET.BALANCE, API_CONFIG.WALLET.SUMMARY],
    TRANSFER: [API_CONFIG.WALLET.TRANSFER, API_CONFIG.WALLET.CREATE_RECIPIENT],
    REPORTS: [API_CONFIG.REPORTS.DASHBOARD, API_CONFIG.REPORTS.SALES],
    STAFF: [API_CONFIG.STAFF.LIST, API_CONFIG.STAFF.ATTENDANCE],
    DASHBOARD: [API_CONFIG.REPORTS.DASHBOARD],
    POS: [API_CONFIG.POS.BASE, API_CONFIG.POS.CART],
  };
  
  return intentMap[intent] || [];
};

export {
  API_CONFIG,
  VOICE_COMMANDS,
  getFullUrl,
  detectIntent,
  getEndpointsForIntent,
};

export default API_CONFIG;
