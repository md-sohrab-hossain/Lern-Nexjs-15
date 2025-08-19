/**
 * Centralized API Layer - Main Entry Point
 * 
 * Clean, organized, and modular API structure
 * 
 * Usage Examples:
 * import { eventsApi, usersApi, authApi } from '@/lib/api';
 * 
 * // Events
 * const events = await eventsApi.getAll();
 * const event = await eventsApi.getById('123');
 * 
 * // Users  
 * const users = await usersApi.getAll();
 * 
 * // Auth
 * const user = await authApi.login({ email, password });
 */

// Import all API modules
export { apiClient as api } from './client';
export { eventsApi } from './events';
export { usersApi } from './users';
export { authApi } from './auth';

// Re-export client for direct usage
export { apiClient } from './client';

// Default export (main client)
export { apiClient as default } from './client';
