import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Authentication Async Thunks
 * 
 * Contains all authentication related async actions.
 * Uses Redux Toolkit's createAsyncThunk to handle API calls.
 */

// User Login Thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('email', credentials.email);
      formData.append('password', credentials.password);

      const { performLogin } = await import('@/actions/authActions');
      const result = await performLogin(formData);

      // Check if server action returned an error
      if (result && result.success === false) {
        return rejectWithValue(result.error || 'Email or password is incorrect');
      }

      // Check if no user returned or missing id
      if (!result || !result.id) {
        return rejectWithValue('Email or password is incorrect');
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// User Registration Thunk  
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        formData.append(key, userData[key]);
      });

      const { registerUser: registerUserAction } = await import('@/actions/authActions');
      const result = await registerUserAction(formData);
      
      // Check if server action returned an error
      if (result && result.success === false) {
        return rejectWithValue(result.error || 'Registration failed');
      }

      // Check if registration was successful
      if (result && result.success === true) {
        return result;
      }

      // If we reach here, something unexpected happened
      return rejectWithValue('Registration failed');
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// User Logout Thunk
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { performLogout } = await import('@/actions/authActions');
      await performLogout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);