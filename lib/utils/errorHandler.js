/**
 * Centralized Error Handling Utilities
 * 
 * Utility functions for all types of error handling.
 * Use for consistent error responses and logging.
 */

/**
 * Custom Error Classes
 */
export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.statusCode = 400;
  }
}

export class AuthenticationError extends Error {
  constructor(message = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

export class AuthorizationError extends Error {
  constructor(message = 'Access denied') {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 403;
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class RateLimitError extends Error {
  constructor(message = 'Too many requests') {
    super(message);
    this.name = 'RateLimitError';
    this.statusCode = 429;
  }
}

export class DatabaseError extends Error {
  constructor(message = 'Database operation failed') {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

/**
 * Error Response Formatter
 */
export function formatErrorResponse(error) {
  // Show full error stack in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const response = {
    success: false,
    error: {
      name: error.name || 'Error',
      message: error.message || 'Something went wrong',
      statusCode: error.statusCode || 500
    }
  };

  // Add additional error details in development
  if (isDevelopment) {
    response.error.stack = error.stack;
    response.error.details = error;
  }

  // Add field information for validation errors
  if (error.field) {
    response.error.field = error.field;
  }

  return response;
}

/**
 * Error Logger
 */
export function logError(error, context = {}) {
  const timestamp = new Date().toISOString();
  const logLevel = error.statusCode >= 500 ? 'ERROR' : 'WARN';
  
  console.log(`[${timestamp}] ${logLevel}:`, {
    name: error.name,
    message: error.message,
    statusCode: error.statusCode,
    stack: error.stack,
    context
  });

  // Send to external logging service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to logging service
    // await sendToLoggingService(error, context);
  }
}

/**
 * Server Action Error Handler
 * For sending consistent error responses from server actions
 */
export function handleServerActionError(error, context = {}) {
  logError(error, context);
  
  // Map common errors to user-friendly messages
  if (error.code === 11000) {
    // MongoDB duplicate key error
          return { 
        success: false, 
        error: 'Account with this information already exists' 
      };
  }

  if (error.name === 'ValidationError' && error.errors) {
    // Mongoose validation error
    const validationErrors = Object.values(error.errors).map(err => err.message);
          return { 
        success: false, 
        error: validationErrors[0] || 'Invalid data provided' 
      };
  }

  // Return user-friendly error message
  const userFriendlyMessage = getUserFriendlyErrorMessage(error);
  return { 
    success: false, 
    error: userFriendlyMessage 
  };
}

/**
 * API Route Error Handler
 * For sending consistent error responses from API routes
 */
export function handleAPIError(error, context = {}) {
  logError(error, context);
  
  const response = formatErrorResponse(error);
  const statusCode = error.statusCode || 500;
  
  return new Response(
    JSON.stringify(response),
    { 
      status: statusCode,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

/**
 * Get User Friendly Error Messages
 */
function getUserFriendlyErrorMessage(error) {
  const errorMessages = {
    'ValidationError': 'Invalid data provided',
    'AuthenticationError': 'Email or password is incorrect',
    'AuthorizationError': 'Access denied',
    'NotFoundError': 'Resource not found',
    'RateLimitError': 'Too many attempts',
    'DatabaseError': 'Database error occurred',
    'MongoError': 'Database error occurred',
    'CastError': 'Invalid data format',
    'JsonWebTokenError': 'Token is invalid',
    'TokenExpiredError': 'Login session expired'
  };

  return errorMessages[error.name] || error.message || 'Something went wrong';
}

/**
 * Async Error Wrapper
 * Server actions এবং API handlers এর জন্য
 */
export function asyncErrorHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw error; // Re-throw to be handled by specific error handlers
    }
  };
}

/**
 * Safe Async Operation
 * Promise based operations এর জন্য
 */
export async function safeAsync(promise, context = {}) {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    logError(error, context);
    return [null, error];
  }
}

/**
 * Validation Error Factory
 */
export function createValidationError(field, message) {
  return new ValidationError(message, field);
}

/**
 * Authentication Error Factory
 */
export function createAuthError(message) {
  return new AuthenticationError(message);
}

/**
 * Rate Limit Error Factory
 */
export function createRateLimitError(message) {
  return new RateLimitError(message);
}
