import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

/**
 * Redux Store Configuration
 * 
 * All reducers and store settings are configured here.
 * Add new feature reducers here when creating new features.
 */

// Load persisted auth state from localStorage  
const loadPersistedAuthState = () => {
  if (typeof window === 'undefined') return undefined;
  
  try {
    const serializedAuth = localStorage.getItem('eventry_auth');
    if (serializedAuth === null) return undefined;
    
    const authState = JSON.parse(serializedAuth);
    return {
      auth: authState
    };
  } catch (err) {
    return undefined;
  }
};

// Save auth state to localStorage
const saveAuthState = (state) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedAuth = JSON.stringify(state.auth);
      localStorage.setItem('eventry_auth', serializedAuth);
    }
  } catch (err) {
    // Handle error silently
  }
};

export const store = configureStore({
  // All reducers in one place
  reducer: {
    auth: authReducer,    // Authentication state
    // Add new feature reducers here
    // posts: postsReducer,
    // users: usersReducer,
  },
  
  // Load persisted state
  preloadedState: loadPersistedAuthState(),
  
  // Helpful settings for development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // These actions will not be serialize checked
        ignoredActions: [
          'auth/login/fulfilled', 
          'auth/register/fulfilled',
          'persist/PERSIST'
        ],
        // These paths will be ignored
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['auth.user._id', 'auth.user.createdAt', 'auth.user.updatedAt'],
      },
    }),
  
  // Disable Redux DevTools in production build if needed
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store changes and save auth state
store.subscribe(() => {
  saveAuthState(store.getState());
});
