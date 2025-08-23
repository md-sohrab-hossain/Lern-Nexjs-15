import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from '../thunks/authThunks';

/**
 * Authentication Slice
 * 
 * Contains authentication state and reducers.
 * Organized in a clean and clear way.
 */

// Initial State - Starting state for authentication
const initialState = {
  user: null,           // User data (will contain info when logged in)
  isAuthenticated: false, // Whether user is logged in
  loading: false,       // Whether API call is in progress
  error: null          // Any error messages
};

// Auth Slice - Redux Toolkit slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  // Simple Actions - Direct state changes
  reducers: {
    // Clear error messages
    clearError: (state) => {
      state.error = null;
    },
    
    // Clear all data on user logout
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    }
  },
  // For Async Actions - What happens during API calls
  extraReducers: (builder) => {
    
    // LOGIN Actions
    builder
      // When login starts
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When login succeeds
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      // When login fails
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // REGISTER Actions
      // When registration starts
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When registration succeeds
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      // When registration fails
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // LOGOUT Actions
      // When logout starts
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      // When logout succeeds
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Clear user data even if logout fails
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

// Export actions - for use in components
export const { clearError, clearAuth } = authSlice.actions;

// Export reducer - for adding to store
export default authSlice.reducer;