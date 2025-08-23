'use server'

import { redirect } from 'next/navigation'
import { userService } from '@/lib/services/userService'
import { validateLoginData, validateRegistrationData, sanitizeUserInput, checkRateLimit } from '@/lib/validation/authValidation'
import { handleServerActionError, createAuthError, createRateLimitError, createValidationError } from '@/lib/utils/errorHandler'

/**
 * User Login Server Action
 * 
 * Clean and secure login handling using service layer.
 * Includes rate limiting and proper validation.
 */
export async function performLogin(formData) {
  const email = sanitizeUserInput(formData.get('email'))
  const password = formData.get('password') // Don't sanitize password
  
  try {
    // Rate limiting check
    const rateLimitResult = checkRateLimit(`login:${email}`, 5, 15 * 60 * 1000);
    if (rateLimitResult.blocked) {
      return {
        success: false,
        error: rateLimitResult.message
      };
    }

    // Input validation
    const validation = validateLoginData(email, password)
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.getFirstError()
      };
    }

    // Authenticate user using service
    const user = await userService.authenticateUser(email, password)
    
    if (!user) {
      return {
        success: false,
        error: 'Email or password is incorrect'
      };
    }

    return user
  } catch (error) {
    return handleServerActionError(error, { action: 'login', email })
  }
}

/**
 * User Registration Server Action
 * 
 * Secure registration using service layer.
 * Includes comprehensive validation and rate limiting.
 */
export async function registerUser(formData) {
  // Extract and sanitize form data
  const userData = {
    name: sanitizeUserInput(formData.get('name')),
    email: sanitizeUserInput(formData.get('email')),
    password: formData.get('password'), // Don't sanitize password
    phone: sanitizeUserInput(formData.get('phone')),
    bio: sanitizeUserInput(formData.get('bio'))
  }

  try {
    // Rate limiting check for registration attempts
    const rateLimitResult = checkRateLimit(`register:${userData.email}`, 3, 30 * 60 * 1000);
    if (rateLimitResult.blocked) {
      return {
        success: false,
        error: rateLimitResult.message
      };
    }

    // Input validation
    const validation = validateRegistrationData(userData)
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.getFirstError()
      };
    }

    // Create user using service
    const newUser = await userService.createUser(userData)

    return { 
      success: true, 
      message: 'Registration successful!',
      user: newUser
    };
  } catch (error) {
    return handleServerActionError(error, { 
      action: 'register', 
      email: userData.email 
    });
  }
}

/**
 * User Logout Server Action
 * 
 * In production, implement JWT token invalidation or session cleanup.
 */
export async function performLogout() {
  try {
    // In production, add token invalidation logic here
    // await invalidateUserTokens(userId)
    // await clearUserSessions(userId)
    
    // For now, just redirecting
    redirect('/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Redirect to login page even if error occurs
    redirect('/login')
  }
}

