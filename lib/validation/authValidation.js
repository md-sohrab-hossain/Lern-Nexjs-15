/**
 * Authentication Validation Schemas
 * 
 * Utility functions for input validation.
 * Use in server actions and API routes.
 */

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password strength regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

/**
 * Validation Result Class
 */
class ValidationResult {
  constructor(isValid = true, errors = {}) {
    this.isValid = isValid;
    this.errors = errors;
  }

  addError(field, message) {
    this.isValid = false;
    if (!this.errors[field]) {
      this.errors[field] = [];
    }
    this.errors[field].push(message);
  }

  getFirstError() {
    const firstField = Object.keys(this.errors)[0];
    return firstField ? this.errors[firstField][0] : null;
  }
}

/**
 * Login data validation
 */
export function validateLoginData(email, password) {
  const result = new ValidationResult();

  // Email validation
  if (!email) {
    result.addError('email', 'Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    result.addError('email', 'Please provide a valid email address');
  }

  // Password validation
  if (!password) {
    result.addError('password', 'Password is required');
  } else if (password.length < 6) {
    result.addError('password', 'Password must be at least 6 characters long');
  }

  return result;
}

/**
 * Registration data validation
 */
export function validateRegistrationData(userData) {
  const result = new ValidationResult();
  const { name, email, password, phone, bio } = userData;

  // Name validation
  if (!name) {
    result.addError('name', 'Name is required');
  } else if (name.length < 2) {
    result.addError('name', 'Name must be at least 2 characters long');
  } else if (name.length > 50) {
    result.addError('name', 'Name cannot exceed 50 characters');
  }

  // Email validation
  if (!email) {
    result.addError('email', 'Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    result.addError('email', 'Please provide a valid email address');
  }

  // Password validation
  if (!password) {
    result.addError('password', 'Password is required');
  } else if (password.length < 6) {
    result.addError('password', 'Password must be at least 6 characters long');
  } else if (password.length > 100) {
    result.addError('password', 'Password is too long');
  }

  // Phone validation (optional)
  if (phone && phone.length > 0) {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    if (!phoneRegex.test(phone)) {
      result.addError('phone', 'Please provide a valid phone number');
    } else if (phone.replace(/[\s\-()]/g, '').length < 10 || phone.replace(/[\s\-()]/g, '').length > 15) {
      result.addError('phone', 'Phone number must be between 10-15 digits');
    }
  }

  // Bio validation (optional)
  if (bio && bio.length > 500) {
    result.addError('bio', 'Bio cannot exceed 500 characters');
  }

  return result;
}

/**
 * Password change validation
 */
export function validatePasswordChange(currentPassword, newPassword, confirmPassword) {
  const result = new ValidationResult();

  // Current password
  if (!currentPassword) {
    result.addError('currentPassword', 'Current password is required');
  }

  // New password
  if (!newPassword) {
    result.addError('newPassword', 'New password is required');
  } else if (newPassword.length < 6) {
    result.addError('newPassword', 'New password must be at least 6 characters long');
  }

  // Confirm password
  if (newPassword && newPassword !== confirmPassword) {
    result.addError('confirmPassword', 'New password confirmation does not match');
  }

  // Same password check
  if (currentPassword && newPassword && currentPassword === newPassword) {
    result.addError('newPassword', 'New password must be different from current password');
  }

  return result;
}

/**
 * Sanitize user input
 */
export function sanitizeUserInput(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

/**
 * Sanitize user data object
 */
export function sanitizeUserData(userData) {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(userData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeUserInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Rate limiting helper (simple in-memory store)
 * Use Redis or database in production
 */
const rateLimitStore = new Map();

export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const key = `${identifier}:${Math.floor(now / windowMs)}`;
  
  const attempts = rateLimitStore.get(key) || 0;
  
  if (attempts >= maxAttempts) {
    return {
      blocked: true,
      remainingTime: windowMs - (now % windowMs),
      message: `Too many attempts. Please try again in ${Math.ceil((windowMs - (now % windowMs)) / 60000)} minutes.`
    };
  }
  
  rateLimitStore.set(key, attempts + 1);
  
  // Cleanup old entries
  if (rateLimitStore.size > 1000) {
    const cutoff = Math.floor((now - windowMs) / windowMs);
    for (const [key] of rateLimitStore) {
      if (key.includes(':') && parseInt(key.split(':')[1]) < cutoff) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  return { blocked: false };
}