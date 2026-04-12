/**
 * AgriMate Constants
 * Design tokens, colors, and app-wide constants
 */

// Color Palette
export const COLORS = {
  primary: '#64ffb4', // Neon Mint
  primaryDark: '#0b1a0b', // Deep Forest Night
  error: '#ff6b6b', // Earthy Error Red
  darkest: '#051105', // Darker Forest
  light: '#f5f5f5', // Light Text
  gray: '#a0a0a0', // Soft Gray
}

// Touch Target Sizes (accessibility)
export const TOUCH_TARGET_SIZES = {
  small: '40px',
  medium: '48px', // Recommended minimum
  large: '56px',
  xlarge: '64px',
}

// Layout Constants
export const LAYOUT = {
  maxWidth: '1280px',
  sidePadding: '1rem',
  headerHeight: '64px',
  cardRadius: '16px',
}

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
}

// API Endpoints (mock)
export const API = {
  // Farmer endpoints
  getAdvisory: '/api/farm/advisory',
  getAlerts: '/api/farm/alerts',
  getWeather: '/api/weather',

  // Officer endpoints
  getFarms: '/api/officer/farms',
  getFarmDetail: '/api/officer/farm/:id',
  getSimulation: '/api/officer/simulation',
  saveFarmData: '/api/officer/farm/:id/data',

  // Sync
  syncData: '/api/sync/upload',
  getSyncStatus: '/api/sync/status',
}

// Mock Strings
export const STRINGS = {
  appName: 'AgriMate',
  appTagline: 'High Tech, High Touch Agriculture',
  farmerMode: 'Farmer Mode',
  officerMode: 'Extension Officer Dashboard',
  offlineMessage: 'Working offline - changes will sync automatically',
  syncing: 'Syncing data...',
  syncError: 'Sync failed - will retry automatically',
}

// Farm Status Colors
export const FARM_STATUS_COLORS = {
  synced: '#64ffb4',
  pending: '#FFD700',
  alert: '#ff6b6b',
}

// Crop Options (mock data)
export const CROP_OPTIONS = ['Wheat', 'Rice', 'Corn', 'Soybean', 'Vegetables', 'Pulses']

// Weather Alert Levels
export const ALERT_LEVELS = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  critical: 'critical',
}
