/**
 * Authentication API
 * All auth-related API operations
 */

import { apiClient } from './client';

export const authApi = {
  // User login
  login: (credentials, options = {}) => {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Email and password are required');
    }
    return apiClient.post('/auth/login', credentials, options);
  },

  // User registration
  register: (userData, options = {}) => {
    if (!userData) throw new Error('User data is required');
    return apiClient.post('/auth/register', userData, options);
  },

  // User logout
  logout: (options = {}) => {
    return apiClient.post('/auth/logout', {}, options);
  },

  // Refresh token
  refreshToken: (refreshToken, options = {}) => {
    if (!refreshToken) throw new Error('Refresh token is required');
    return apiClient.post('/auth/refresh', { refreshToken }, options);
  },

  // Get current user
  getCurrentUser: (options = {}) => {
    return apiClient.get('/auth/me', {}, options);
  },

  // Forgot password
  forgotPassword: (email, options = {}) => {
    if (!email) throw new Error('Email is required');
    return apiClient.post('/auth/forgot-password', { email }, options);
  },

  // Reset password
  resetPassword: (resetData, options = {}) => {
    if (!resetData?.token || !resetData?.password) {
      throw new Error('Reset token and new password are required');
    }
    return apiClient.post('/auth/reset-password', resetData, options);
  },
};

export default authApi;
