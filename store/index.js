/**
 * Redux Store Index File
 * 
 * Contains all important store exports in one place.
 * Use this file for imports from components.
 */

// Store configuration
export { store } from './store';

// Store Provider component
export { default as StoreProvider } from './StoreProvider';

// Auth related exports
export { 
  clearError, 
  clearAuth 
} from './features/authSlice';

export { 
  loginUser, 
  registerUser, 
  logoutUser 
} from './thunks/authThunks';

// Types for TypeScript users (future use)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

