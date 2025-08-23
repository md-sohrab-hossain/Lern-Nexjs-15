import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

/**
 * Redux Store Configuration
 * 
 * All reducers and store settings are configured here.
 * Add new feature reducers here when creating new features.
 */

export const store = configureStore({
  // All reducers in one place
  reducer: {
    auth: authReducer,    // Authentication state
    // Add new feature reducers here
    // posts: postsReducer,
    // users: usersReducer,
  },
  
  // Helpful settings for development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // These actions will not be serialize checked
        ignoredActions: [
          'auth/login/fulfilled', 
          'auth/register/fulfilled'
        ],
        // These paths will be ignored
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['auth.user._id'],
      },
    }),
  
  // Disable Redux DevTools in production build if needed
  devTools: process.env.NODE_ENV !== 'production',
});
