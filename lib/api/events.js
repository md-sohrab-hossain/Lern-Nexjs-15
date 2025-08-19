/**
 * Events API
 * All event-related API operations
 */

import { apiClient } from './client';

export const eventsApi = {
  // Get all events
  getAll: (options = {}) => {
    return apiClient.get('/events', {}, options);
  },

  // Get single event by ID
  getById: (id, options = {}) => {
    if (!id) throw new Error('Event ID is required');
    return apiClient.get(`/events/${id}`, {}, options);
  },

  // Create new event
  create: (eventData, options = {}) => {
    if (!eventData) throw new Error('Event data is required');
    return apiClient.post('/events', eventData, options);
  },

  // Update existing event
  update: (id, eventData, options = {}) => {
    if (!id) throw new Error('Event ID is required');
    if (!eventData) throw new Error('Event data is required');
    return apiClient.put(`/events/${id}`, eventData, options);
  },

  // Delete event
  delete: (id, options = {}) => {
    if (!id) throw new Error('Event ID is required');
    return apiClient.delete(`/events/${id}`, options);
  },

  // Search events
  search: (query, options = {}) => {
    if (!query) throw new Error('Search query is required');
    return apiClient.get('/events', { search: query }, options);
  },

  // Get events by category
  getByCategory: (category, options = {}) => {
    if (!category) throw new Error('Category is required');
    return apiClient.get('/events', { category }, options);
  },

  // Get upcoming events
  getUpcoming: (options = {}) => {
    return apiClient.get('/events', { upcoming: true }, options);
  },
};

export default eventsApi;
