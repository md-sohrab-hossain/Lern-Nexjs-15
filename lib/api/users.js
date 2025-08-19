/**
 * Users API
 * All user-related API operations
 */

import { apiClient } from './client';

export const usersApi = {
  // Get all users
  getAll: (options = {}) => {
    return apiClient.get('/users', {}, options);
  },

  // Get single user by ID
  getById: (id, options = {}) => {
    if (!id) throw new Error('User ID is required');
    return apiClient.get(`/users/${id}`, {}, options);
  },

  // Create new user
  create: (userData, options = {}) => {
    if (!userData) throw new Error('User data is required');
    return apiClient.post('/users', userData, options);
  },

  // Update existing user
  update: (id, userData, options = {}) => {
    if (!id) throw new Error('User ID is required');
    if (!userData) throw new Error('User data is required');
    return apiClient.put(`/users/${id}`, userData, options);
  },

  // Delete user
  delete: (id, options = {}) => {
    if (!id) throw new Error('User ID is required');
    return apiClient.delete(`/users/${id}`, options);
  },

  // Get user profile
  getProfile: (id, options = {}) => {
    if (!id) throw new Error('User ID is required');
    return apiClient.get(`/users/${id}/profile`, {}, options);
  },

  // Update user profile
  updateProfile: (id, profileData, options = {}) => {
    if (!id) throw new Error('User ID is required');
    if (!profileData) throw new Error('Profile data is required');
    return apiClient.put(`/users/${id}/profile`, profileData, options);
  },
};

export default usersApi;
