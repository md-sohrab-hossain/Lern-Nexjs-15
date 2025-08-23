/**
 * Security Middleware Functions
 * 
 * Security utilities for API routes and server actions.
 * Add more advanced security measures in production.
 */

import { headers } from 'next/headers';

/**
 * Set CORS Headers
 */
export function setCORSHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

/**
 * Set Security Headers
 */
export function setSecurityHeaders(response) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (adjust based on your needs)
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

/**
 * Request Body Size Validation
 */
export function validateRequestSize(request, maxSize = 1024 * 1024) { // 1MB default
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > maxSize) {
    throw new Error('Request body too large');
  }
}

/**
 * Get client IP address
 */
export function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return realIP || cfIP || 'unknown';
}

/**
 * User Agent validation (basic bot detection)
 */
export function validateUserAgent(request) {
  const userAgent = request.headers.get('user-agent');
  
  if (!userAgent) {
    return { isValid: false, reason: 'Missing User-Agent' };
  }
  
  // Basic bot patterns (expand as needed)
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i
  ];
  
  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  
  return { 
    isValid: !isBot, 
    reason: isBot ? 'Bot detected' : null,
    userAgent 
  };
}

/**
 * Request Method Validation
 */
export function validateMethod(request, allowedMethods = ['GET', 'POST']) {
  const method = request.method;
  
  if (!allowedMethods.includes(method)) {
    throw new Error(`Method ${method} not allowed`);
  }
}

/**
 * Content Type Validation
 */
export function validateContentType(request, expectedType = 'application/json') {
  const contentType = request.headers.get('content-type');
  
  if (!contentType || !contentType.includes(expectedType)) {
    throw new Error(`Invalid content type. Expected ${expectedType}`);
  }
}

/**
 * Simple Honeypot Check
 * Bot detection using hidden form field
 */
export function checkHoneypot(formData, honeypotField = 'website') {
  const honeypotValue = formData.get(honeypotField);
  
  if (honeypotValue && honeypotValue.length > 0) {
    throw new Error('Bot detected via honeypot');
  }
}

/**
 * Request Timestamp Validation
 * Reject requests that are too old
 */
export function validateTimestamp(timestamp, maxAge = 5 * 60 * 1000) { // 5 minutes
  const now = Date.now();
  const requestTime = new Date(timestamp).getTime();
  
  if (!timestamp || isNaN(requestTime)) {
    throw new Error('Invalid timestamp');
  }
  
  if (now - requestTime > maxAge) {
    throw new Error('Request too old');
  }
  
  if (requestTime > now + 60000) { // 1 minute in future
    throw new Error('Request from future');
  }
}

/**
 * Basic DDoS Protection
 * Simple request counting per IP
 */
const requestCounts = new Map();

export function checkDDoS(clientIP, maxRequests = 100, windowMs = 60000) {
  const now = Date.now();
  const windowStart = Math.floor(now / windowMs) * windowMs;
  const key = `${clientIP}:${windowStart}`;
  
  const currentCount = requestCounts.get(key) || 0;
  
  if (currentCount >= maxRequests) {
    throw new Error('Too many requests from this IP');
  }
  
  requestCounts.set(key, currentCount + 1);
  
  // Cleanup old entries periodically
  if (requestCounts.size > 10000) {
    const cutoff = now - (windowMs * 2);
    for (const [key] of requestCounts) {
      const timestamp = parseInt(key.split(':')[1]);
      if (timestamp < cutoff) {
        requestCounts.delete(key);
      }
    }
  }
}

/**
 * Comprehensive Security Check
 * Run all security checks together
 */
export function performSecurityCheck(request, options = {}) {
  const {
    validateSize = true,
    maxSize = 1024 * 1024,
    checkUserAgent = true,
    allowedMethods = ['GET', 'POST'],
    checkDDoSProtection = true,
    maxRequestsPerMinute = 100
  } = options;
  
  try {
    // Method validation
    validateMethod(request, allowedMethods);
    
    // Request size validation
    if (validateSize) {
      validateRequestSize(request, maxSize);
    }
    
    // User agent validation
    if (checkUserAgent) {
      const userAgentCheck = validateUserAgent(request);
      if (!userAgentCheck.isValid) {
        throw new Error(userAgentCheck.reason);
      }
    }
    
    // DDoS protection
    if (checkDDoSProtection) {
      const clientIP = getClientIP(request);
      checkDDoS(clientIP, maxRequestsPerMinute);
    }
    
    return { passed: true };
  } catch (error) {
    return { 
      passed: false, 
      error: error.message,
      blocked: true 
    };
  }
}
